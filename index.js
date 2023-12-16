const fs = require('fs');
const axios = require('axios');
const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')();
const path = './destination/'
//Tải ảnh từ url về folder có đường dẫn path
const downloadFromUrl = async (url,path) => {
    const response = await axios({
            method:'GET',
            url,
            responseType:'stream'
    })
    const currentDate = new Date()
    var path = path + `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getMilliseconds()}.jpg`;
    const writer = fs.createWriteStream(path)
    response.data.pipe(writer)
    return new Promise((res,rej)=>{
        writer.on('finish',()=>{
            console.log(`Ảnh được lưu tại ${path}`);
            res()
        })
        writer.on('error',rej)
    })

}

(async () => {
    //khởi tạo các biến
    let gender = 'all'
    let age = 'all'
    let etnic = 'all'
    //khởi chạy browser
    const browser = await puppeteer.launch({
        headless:true
    })
    const page = await browser.newPage()
    await page.goto('https://this-person-does-not-exist.com/vi')
    console.log('Đã truy cập  https://this-person-does-not-exist.com/vi')

    do {
        //Nhập các biến gender,age, etnic
        gender = prompt('Nhập giới tính(all/female/male): ')
        if(!(gender === 'all'   ||
           gender === 'female'||
           gender === 'male'   )){
                console.log('Hãy nhập đúng giới tính');
                continue;
        }
        
        await page.select("select[name = 'gender']",gender)//chọn thành công gender
        age = prompt('Nhập khoảng tuổi(all/12-18/19-25/26-35/35-50/50): ')
        if(!(age === 'all' ||
           age === '12-18' ||
           age === '19-25' ||
           age === '26-35' ||
           age === '35-50' || 
           age === '50'     )) {
                console.log('Hãy nhập đúng khoảng tuổi');
                continue;
        }
           await page.select("select[name = 'age']",age)
        etnic = prompt('Nhập dân tộc(all/asian/black/white/indian/middle_eastern/latino_hispanic): ')
        if(!(etnic === 'all' ||
        etnic === 'asian' ||
        etnic === 'black' ||
        etnic === 'white' ||
        etnic === 'indian' ||
        etnic === 'middle_eastern' ||
        etnic === 'latino_hispanic'  )) {
            console.log('Hãy nhập đúng dân tộc');
                continue;
        }
        await page.select("select[name = 'etnic']",etnic)

        //click vào nút reload
        await page.click("#reload-button")

        //chờ cho đến khi ảnh được load
        console.log('Chờ xíu nhé....')
        while(true){
            await page.waitForTimeout(3010)
            const buttonClass = await page.$eval("#reload-button",(button)=>{
                return [...button.classList]
            })
            if(buttonClass.length===0)break;
            console.log(buttonClass)
            
        }
        console.log('Ảnh đã load xong')
        
        const imgUrl = await page.$eval("#avatar",(img) => {
            return img.src
        })
        await downloadFromUrl(imgUrl,path);
        let ctn = prompt('Tiếp tục?(y/n): ');
        if(ctn === 'n'||ctn ==='N'){
            await browser.close();
            break;
        }
        
    }while(true);
    
})()
