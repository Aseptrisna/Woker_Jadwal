const express = require("express");
const app = express();
var moment = require('moment');
const jsonfile = require('jsonfile')
var mqtt = require('mqtt')
function readdata(jam_sekarang,file){
    return new Promise(async (resolve, reject) => {
    try{
        jsonfile.readFile(file, function (err, obj) {
            // if (err) console.error(err)
            var DataPublish = JSON.stringify(obj, null, 1) + "\n";
            try {
                const objec = JSON.parse(DataPublish);
                var jam  = jam_sekarang
                var imei=(obj.imei);
                var nama=(obj.nama);
                var jam=(obj.jammulai);
                var jamakhir=(obj.jamakhir);
                var package=(obj.package);
                var messageopen="Aplikasi"+" "+nama+" "+" Bisa Dibuka";
                console.log(jam+jamakhir)
                if (jam==jam_sekarang){
                    var channel="notifikasi";
                    console.log("Kirim Notifikasi")
                    sendToMqtt(channel,DataPublish)
                }else if(jamakhir==jam_sekarang){
                    var channel="notifikasi_tutup";
                    console.log("Kirim Notifikasi")
                    sendToMqtt(channel,DataPublish)
                }else{
                    console.log("belum ada Aplikasi terjadwal")
                }

        } catch (error) {
        console.log("belum ada jadwal aplikasi")

        }
        })
    }
    catch (e) {
        console.log("Tidak ada Jadwal untuk saat ini");
        console.log(e);
        }
        finally {
        console.log("Tidak ada Notifikasi untuk saat ini");
        }
    });
}
app.listen(1000, () => {
console.log('Server Running on 3000 port')
})
setInterval(gethari,60000);
function gethari(){
    var moment = require('moment'); // require
    var lengkap=moment().format("MM-DD-YYYY")
    var jam = new Date().getHours();
    var menit= new Date().getMinutes();
    var detik= new Date().getSeconds();
    console.log(jam+":"+menit+":"+detik)
    var jam_sekarang=jam+"."+menit;
    const file  = './file/'+jam_sekarang+'.json'
    readdata(jam_sekarang,file);
    console.log(file)
}
function sendToMqtt (mac,message) {
    console.log("Mulai Mengirim Notifikasi")
        var client = mqtt.connect('mqtt://cloudrmqserver.pptik.id/mqtt', {
            username: '/mahasiswaubl:ubliot',
            password: 'qwerty1245',
            protocolId: 'MQTT'
        })
            client.on('connect', function () {
            client.publish(mac, message)
                console.log("berhasil Mengirim notifikasi")
                client.end()
            })
}
