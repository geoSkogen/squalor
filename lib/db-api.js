'use strict'
var msgs = document.querySelectorAll('.db_msg')
var msg_index = 0;
var script = document.getElementById('json-api')

buildContent(script.innerHTML)
msgs.forEach( function (msg) {
  if (!msg_index) {
    console.log('Database Error Message(s) from LAMP:')
  }
  console.log('#' + (msg_index+1).toString() )
  console.log(msg.innerText)
  msg_index++
})
