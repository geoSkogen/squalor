'use strict'

var user_submit = document.querySelector('#save')
var api_submit = document.querySelector('#api-submit')
var post_object = {
  'name' : '',
  'items' : []
}
var posts = {
  posts:[]
}

user_submit.addEventListener('click',  manifestPosts)

function manifestPosts() {
  var post_fields = document.querySelectorAll('.post')
  var post_items = []
  post_fields.forEach( (field) => {
    post_object.name = field.id
    
  })

}
