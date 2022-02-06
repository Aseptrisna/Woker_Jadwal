const jsonfile = require('jsonfile')
var q = 'jadwal';
require('amqplib/callback_api')
    .connect({ protocol: 'amqp', hostname: 'cloudrmqserver.pptik.id', port: '5672', username: 'ubliot', password: 'qwerty1245', vhost: '/mahasiswaubl' }, function(err, conn) {
        if (err != null) bail(err);
        consumer(conn);
    });
function consumer(conn) {
        var ok = conn.createChannel(on_open);
        function on_open(err, ch) {
            if (err != null) bail(err);
            ch.assertQueue(q);
            ch.consume(q, function(msg) {
            if (msg !== null) {
                console.log(msg.content.toString());
                ch.ack(msg);
                var json=msg.content.toString();
                savejson(json)
            }
            });
        }
    }
function savejson(data){
const obj = JSON.parse(data);
var imei=(obj.imei);
var jammulai=(obj.jammulai);
var jamakhir=(obj.jamakhir);
var package=(obj.package);
var nama=(obj.nama);
const jadwal= { imei: imei,jammulai:jammulai,jamakhir:jamakhir,package:package,nama:nama}
// Savejadwal(jadwal)
// console.log(jam)
const file = './file/'+jammulai+'.json'
const file1 = './file/'+jamakhir+'.json'
jsonfile.writeFileSync(file,jadwal)
jsonfile.writeFileSync(file1,jadwal)
}
