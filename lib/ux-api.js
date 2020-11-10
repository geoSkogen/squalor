'use strict'

//window.addEventListener('load', Main)

//function Main () {

  var toggles = ['xout','backdown','postedit','plusup']
  var preps = ['out','down','up']

  function navControls() {
    var xout = document.createElement('div')
    var x = document.createElement('div')
    var backdown = document.createElement('div')
    var back = document.createElement('div')
    var xtext = document.createTextNode('X')
    //var backtext = document.createTextNode('&laquo;')
    xout.className = 'xout'
    xout.setAttribute('disptoggle','none,flex')
    back.innerHTML = '&laquo;'
    backdown.className = 'backdown'
    backdown.setAttribute('disptoggle','none,flex')
    x.className = 'x'
    back.className = 'back'
    x.appendChild(xtext)
    //back.appendChild(backtext)
    xout.appendChild(x)
    backdown.appendChild(back)
    return [xout,backdown]
  }

  function listControls() {
    var plus =  document.createElement('div')
    var plusup = document.createElement('div')
    var plustext = document.createTextNode('+')
    var thisul = document.createElement('ul')
    plusup.className = 'plusup'
    plusup.setAttribute('disptoggle','none,flex')
    plus.className = 'plus'
    plus.appendChild(plustext)
    plusup.appendChild(plus)
    return [plusup,thisul]
  }

  function doData(domel,arg) {

    var data_arr = []
    var toggle_att = ''
    var toggle_atts = ['data','disp','texttrans']

    toggle_atts.forEach( function (att) {
      if (domel.getAttribute(att + 'toggle')) {
        data_arr = domel.getAttribute(att + 'toggle').split(',')
        toggle_att = att
      }
    })
    if (arg) {
      data_arr.reverse()
      domel.setAttribute(toggle_att+'toggle',data_arr)
    }
    switch(toggle_att) {
      case 'disp' :
        domel.style.display = data_arr[0]
        break
      case 'texttrans' :
        domel.style.textTransform = data_arr[0]
        break
      case 'data' :
        if ( domel.querySelector('input') && domel.querySelector('.textspan') &&
             (!domel.querySelector('input').value||domel.querySelector('input').value===' ')
           ) {
          domel.querySelector('input').value =
            domel.querySelector('.textspan').innerText
        }
        break
      default :

    }
  }
  //DOM elements
 var app = document.getElementById('app')
 var callresponse = document.getElementById('callresponse')
 var go = document.getElementById('go')
 var mode = {
   post:true,
   item:false,
   content:''
 }

 go.addEventListener('click', addContent)

 callresponse.addEventListener('keypress', function () {
   if (event.keyCode === 13) {
     go.click()
   }
 })

 callresponse.addEventListener('focus',function () {
   mode.post=true
   mode.item=false
 })

 callresponse.focus()

 function addContent () {

   if (callresponse.value != '') {

     var text = callresponse.value

     if (mode.post) {

       var newPost = makeAPost(text, text)

       app.appendChild(newPost)

       newPost.addEventListener('click',function (event) {
         console.log('post click')
         if (event.target.className==='post') {
           var self = this
           mode.content = (this.querySelector('.textspan')) ?
            this.querySelector('.textspan').innerText : mode.content

           if (this.getAttribute('datatoggle').split(',')[0]!='open') {
             console.log('your datatoggle was closed')
             doData(self,true)
             toggles.forEach( function (toggle) {
               if (self.querySelector('.' + toggle)) {
                 doData(self.querySelector('.' + toggle),true)
               }
             })
           } else {
             console.log('your datatoggle is already open')
           }
         } else if (event.target.className==='plus') {
           console.log('got plus click?')
           mode.post = false
           mode.item = this.id
           newPost.querySelector('.anInput').value = ''
           newPost.querySelector('.anInput').focus()
         } else if (event.target.className==='item') {
           console.log('you clicked on li')
           doData(event.target,true)
         }
       })

       for (var i = 0; i < toggles.length; i++) {
         var this_class = toggles[i].replace(preps[i],'')
         var this_click = newPost.querySelector('.'+ (this_class) )
         console.log(this_click)
         if (toggles[i]!='postedit') {
           this_click.addEventListener('click', function (event) {

             switch(this.className) {
               case 'x' :
                 app.removeChild(newPost)
                 break
               case 'back' :
                 toggleOut(newPost)
                 break
               case 'plus' :
               //console.log('bean')
                 mode.post = false
                 mode.item = this.id
                 newPost.querySelector('.anInput').value = ''
                 newPost.querySelector('.anInput').focus()
                 break
               default :
             }

           })
         }
       }

       callresponse.value = ''
       callresponse.focus()

     } else if (mode.item) {

       var newItem = addItem(text)

     }
   }
 }

  function makeAPost (idStr, contentStr) {
   var tnode = document.createTextNode(contentStr)
   var navcontrols = navControls()
   var listcontrols = listControls()
   var tspan = document.createElement('span')
   var aninput = document.createElement('input')
   var div = document.createElement('div')
   var br = document.createElement('br')

   div.className = 'post'
   div.id = idStr
   div.setAttribute('datatoggle','closed,open')

   aninput.type = 'text'
   aninput.value = contentStr
   aninput.className = 'anInput postedit'
   aninput.setAttribute('disptoggle','none,flex')
   aninput.addEventListener('keypress', function (event) {
     if (event.keyCode===13) {
       if (mode.item) {
         mode.item = this.parentElement.id
         var newItem = addItem()
       } else if (mode.post) {
         toggleOut(this.parentElement)
       }
     }
   })

   tspan.className = 'textspan'
   tspan.appendChild(tnode)

   navcontrols.forEach( function (thisdiv) {
    div.appendChild(thisdiv)
    doData(thisdiv,false)
   })

   div.appendChild(aninput)
   doData(aninput,false)
   div.appendChild(br)
   div.appendChild(tspan)

   listcontrols.forEach( function (nextdiv) {
     div.appendChild(nextdiv)
     doData(nextdiv,false)
   })

   return div

 }

 function addItem() {
   var parent_ul = document.querySelector('#' + mode.item).querySelector('ul')
   var li = document.createElement('li')
   var li_node = document.createTextNode(
     document.querySelector('#' + mode.item).querySelector('input').value
   )
   li.appendChild(li_node)
   li.className = 'item'
   li.setAttribute('texttranstoggle','none,strikethrough')
   li.addEventListener('click', function () {
     doData(li,true)
   })
   parent_ul.appendChild(li)
   parent_ul.parentElement.querySelector('input').value = ''
   parent_ul.parentElement.querySelector('input').focus()

   console.log(mode.item)
 }

 function toggleOut(parent) {
   console.log('modifying div called ' + parent.id)
   parent.querySelector('.textspan').innerText = (mode.post) ?
     parent.querySelector('.anInput').value : parent.querySelector('.textspan').innerText
   doData(parent,true)
   toggles.forEach( function (toggle) {
     if (parent.querySelector('.' + toggle)) {
       doData(parent.querySelector('.' + toggle),true)
     }
   })

   mode.post = true;
   mode.item = false;
 }

//}
