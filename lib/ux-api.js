'use strict'

//window.addEventListener('load', Main)

//function Main () {

 // shared property names
 var toggles = ['xout','backdown','postedit','plusup']
 var preps = ['out','down','up']
 // DOM elements
 var app = document.getElementById('app')
 var callresponse = document.getElementById('callresponse')
 var go = document.getElementById('go')
 var save = document.getElementById('save')
 var mode = {
   post:true,
   item:false,
   content:''
 }
 // set up the DOM UI
 go.addEventListener('click', function () { addContent(false) } )

 save.addEventListener('click', saveContent)

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
      data_arr = data_arr.reverse()
      domel.setAttribute(toggle_att+'toggle',data_arr.join(','))
    }
    console.log('got toggle att '+toggle_att)
    switch(toggle_att) {
      case 'disp' :
        domel.style.display = data_arr[0]
        break
      case 'texttrans' :
      console.log('case toggle att '+toggle_att)
      console.log(domel)
      console.log(data_arr[0])
        domel.style.textDecoration = data_arr[0]
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

 function addContent(arg) {

   if (callresponse.value != '') {

     var text = (arg) ? arg : callresponse.value

     if (mode.post) {

       var newPost = makeAPost(text, text)

       callresponse.value = ''
       callresponse.focus()

     } else if (mode.item) {

       var newItem = addItem(false,false)

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
   div.id = idStr.split(' ')[0]
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

   app.appendChild(div)
   div.addEventListener('click', function () {
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
       div.querySelector('.anInput').value = ''
       div.querySelector('.anInput').focus()
     } else if (event.target.className==='item') {
       console.log('you clicked on li')
       doData(event.target,true)
     }
   })

   for (var i = 0; i < toggles.length; i++) {
     var this_class = toggles[i].replace(preps[i],'')
     var this_click = div.querySelector('.'+ (this_class) )
     console.log(this_click)
     if (toggles[i]!='postedit') {
       this_click.addEventListener('click', function (event) {

         switch(this.className) {
           case 'x' :
             app.removeChild(div)
             break
           case 'back' :
             toggleOut(div)
             break
           case 'plus' :
           //console.log('bean')
             mode.post = false
             mode.item = this.id
             div.querySelector('.anInput').value = ''
             div.querySelector('.anInput').focus()
             break
           default :
         }

       })
     }
   }

 }

 function addItem(arg,text) {
   var textnode_val = (text) ? text :
    document.querySelector('#' + mode.item).querySelector('input').value
   var parent_ul = document.querySelector('#' + mode.item).querySelector('ul')
   var li = document.createElement('li')
   var li_node = document.createTextNode(textnode_val)
   //var attr = (arg) ? 'line-through,none' : 'none,line-through'
   li.appendChild(li_node)
   li.className = 'item'
   li.setAttribute('texttranstoggle','none,line-through')
   li.addEventListener('click', function () {
     //doData(li,true)
   })
   parent_ul.appendChild(li)
   parent_ul.parentElement.querySelector('input').value = ''
   parent_ul.parentElement.querySelector('input').focus()
   if (arg) { doData(li,true) }
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

 function saveContent() {
   var result = []
   var posts = document.querySelectorAll('.post')
   var input = document.querySelector('#api-json')
   var submit = document.querySelector('#api-submit')
   var form = document.querySelector('form')
   var items = []
   form.action = window.location.href
   posts.forEach( function (post) {
     var name = post.querySelector('.textspan') ?
       post.querySelector('.textspan').innerText : '(none)'
     var row_tuple = {'textspan':name,'items':[]}
     var row_items = post.querySelectorAll('.item')
     row_items.forEach( function (item) {
       var this_toggle = (!item.getAttribute('texttranstoggle').indexOf('none')) ? false : true
       var item_tuple = {
         text:item.innerHTML,
         toggle:this_toggle
       }
       row_tuple.items.push(item_tuple)
     })
     result.push(row_tuple)
   })
   input.value = JSON.stringify(result)
   submit.click()
 }

 function buildContent(json) {
   var items = [];
   var data = JSON.parse(json)
   data.forEach( function (post) {
     var this_id = post.textspan.split(' ')[0]
     makeAPost(this_id,post.textspan)
     if (post.items) {
       var items = JSON.parse(post.items)
       console.log('post items')
       console.log(items)
       items.forEach( function (item) {
         var this_toggle = eval(item.toggle)
         mode.item = post.textspan
         addItem(this_toggle,item.text)
       })
     }
   })

 }
 //var table = '[{"textspan":"this","items":[{"text":"eat ","toggle":"true"},{"text":"my","toggle":"false"},{"text":"oul","toggle":"false"}]},{"textspan":"is","items":[{"text":"dry ","toggle":"false"},{"text":"my","toggle":"false"},{"text":"ters","toggle":"false"}]},{"textspan":"oileaye","items":[{"text":"bernRAEA","toggle":"false"},{"text":"DRUCKSH","toggle":"false"}]}]'
 //buildContent(table)
//}
