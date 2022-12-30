const fs = require('fs');
const path = require('path');

function saveData(readPath, writePath, overWrite) {
    fs.readdir(path.join(__dirname, readPath), function (err, files) {
        if (err) {
            console.log(err);
        } else {
            console.log(files);
    
            fs.mkdir(path.join(__dirname, writePath), function (err) {
                if (err) {
                    if (err.code === 'EEXIST') {
                        console.log('Folder już istnieje');
                        return;
                    }
                    console.log(err);
                } else {
                    console.log('Stworzono folder');
                }
            })
    
            files.forEach(function (file) {
                fs.readFile(path.join(__dirname, readPath, file), 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(JSON.parse(data));
    
                        let studentsData = JSON.parse(data);
    
                        for (let element of studentsData) {

                            let elementPath = path.join(__dirname, writePath, `${element.id}-${element.name}-${element.username}.txt`);

                            let elementEexist = fs.existsSync(elementPath);

                            if (elementEexist && !overWrite) { 
                                

                                console.log('Plik już istnieje');

                            } else {
                                fs.writeFile(elementPath, `Name: ${element.name} \nSurname: ${element.username} \nStreet: ${element.address.street} \nZip Code: ${element.address.zipcode} \nCity: ${element.address.city} \nPhone: ${element.phone} \n`, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('Stworzono plik');
                                    }
                                })
                                console.log(element);

                            }
                           
                        }
                    }
    
                })
    
            })
    
        }
    
    })
    

}

module.exports = saveData;




