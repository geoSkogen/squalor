'use strict'

window.addEventListener("load", Main)

function Main () {
  //DOM elements
 var app = document.getElementById("app")
 var callresponse = document.getElementById("callresponse")
 var go = document.getElementById("go")
 var mode = {
   post:true,
   item:false
 }
 var postsText = new Array()
 var posts = new Array()

 go.addEventListener("click", addContent)
 callresponse.addEventListener("keypress", function () {
   if (event.keyCode === 13) {
     go.click()
   }
 })
 callresponse.addEventListener('focus',function () {
   mode.post=true
 })
 callresponse.focus()

 function addContent () {
   if (callresponse.value != "") {
     var text = callresponse.value
     if (mode.post) {

       var newPost = makeAPost(text, text)
       postsText.push(text)
       app.appendChild(newPost)

     } else if (mode.item) {

       var newItem = addItem(text)

     }

   }
 }

  function makeAPost (idStr, contentStr) {
   var tnode = document.createTextNode(contentStr)
   var tspan = document.createElement('span')
   var div = document.createElement('div')
   var thisUl = document.createElement('ul')
   div.className = "post"
   div.id = idStr
   tspan.className = 'textspan'
   tspan.appendChild(tnode)
   div.setAttribute('datatoggle','closed')
   div.appendChild(tspan)
   div.appendChild(thisUl)
   div.addEventListener('click', function () {

     var content = this.textContent
     var index = postsText.indexOf(content)

     if (this.getAttribute('datatoggle')!='open') {
       var anInput = document.createElement('input')
       var xout = document.createElement('div')
       var x = document.createElement('div')
       var plusup = document.createElement('div')
       var plus = document.createElement('div')
       var xtext = document.createTextNode("X")
       var plustext = document.createTextNode("+")
       this.setAttribute('datatoggle','open')
       anInput.className = "anInput"
       anInput.id = "aninputcalled_" + content.replace(/\s/g,'_')
       anInput.value = content
       xout.className = "xout"
       plusup.className = "plusup"
       x.className = "x"
       plus.className = "plus"
       x.appendChild(xtext)
       plus.appendChild(plustext)
       x.addEventListener('click', function () {
         var parent = this.parentNode.parentNode.parentNode
         var removeMe = this.parentNode.parentNode
         var posts = document.getElementsByClassName("post")
         var report = this.parentNode.nextSibling.className
         postsText.splice(index,1)
         parent.removeChild(removeMe)
       })

       plus.addEventListener('click', function () {
         mode.item=anInput.id
         mode.post=false
         anInput.value = ''
         anInput.focus()
       })

       this.replaceChild(anInput, this.querySelector('.textspan'))
       anInput.focus()
       anInput.addEventListener("keypress", function () {
       if (event.keyCode === 13) {
         var editedText = this.value
         var replaceMe = this
         var newPost = document.createTextNode(editedText)
         var newSpan = document.createElement('span')

         var parent = this.parentNode
         newSpan.className = 'textspan'
         newSpan.appendChild(newPost)
         parent.replaceChild(newSpan, replaceMe)
         parent.removeChild(parent.querySelector('.xout'))
         parent.removeChild(parent.querySelector('.plusup'))
         parent.setAttribute('datatoggle','closed')
       }
     })
     this.insertBefore(xout, anInput)
     this.appendChild(plusup)
     plusup.appendChild(plus)
     xout.appendChild(x)
     }
   })
   return div
 }

 function addItem() {
   var parent_ul = document.querySelector('#' + mode.item).parentNode.querySelector('ul')
   var li = document.createElement('li')
   var li_node = document.createTextNode(document.querySelector('#' + mode.item).value)
   li.appendChild(li_node)
   parent_ul.appendChild(li)

   console.log(mode.item)
 }

}
