const posts = [];

const TITLE_ITEMS_LIMIT = 20;
const TEXT_ITEMS_LIMIT = 50;


const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const itemsTextLimitNode = document.querySelector('.js-text-limit');

newPostBtnNode.addEventListener('click', function () {
    if(!postTitleInputNode.value.trim()){
        alert("Поле ввода (Напишите заголовок) не заполнено!");
        return;
    }

    if(!postTextInputNode.value.trim()){
        alert("Поле ввода (Напишите пост) не заполнено!");
        return;
    }
    
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();

    
});

postTitleInputNode.addEventListener('input', function (){
    checkLength();
    
});

postTextInputNode.addEventListener('input', function (){
    checkLength();
    
});

function checkLength() {

    const titleLength = postTitleInputNode.value.length;
    const textLength = postTextInputNode.value.length;
    
    if(titleLength > TITLE_ITEMS_LIMIT) {
        itemsTextLimitNode.innerText = `Заголовок не должен превышать ${TITLE_ITEMS_LIMIT} символов`;
        itemsTextLimitNode.classList.remove('text-limit-hidden');
        newPostBtnNode.innerHTML = "STOP!!!";
        newPostBtnNode.disabled = true;
        newPostBtnNode.style.backgroundColor = "#FF0000";
        return;
    }

    if(textLength > TEXT_ITEMS_LIMIT) {
        itemsTextLimitNode.innerText = `Пост не должен превышать ${TEXT_ITEMS_LIMIT} символов`;
        itemsTextLimitNode.classList.remove('text-limit-hidden');
        newPostBtnNode.innerHTML = "STOP!!!";
        newPostBtnNode.disabled = true;
        newPostBtnNode.style.backgroundColor = "#FF0000";
        return;
    }

        itemsTextLimitNode.classList.add('text-limit-hidden');
        newPostBtnNode.innerHTML = "Опубликовать";
        newPostBtnNode.disabled = false;
        newPostBtnNode.style.backgroundColor = "#0094FF";
}       


function addLeadingZero(fullDateItem) {
    let twoDigitNumber = 10;
    return (fullDateItem < twoDigitNumber) ? '0' + fullDateItem : fullDateItem;
}

function getDate(t = new Date()) {
    let Y = t.getFullYear();
    let M = addLeadingZero(t.getMonth() + 1);
    let D = addLeadingZero(t.getDate());
    let h = addLeadingZero(t.getHours());
    let m = addLeadingZero(t.getMinutes());
    return `${D}.${M}.${Y} ${h}:${m}`
}


function getPostFromUser() {
    const title = postTitleInputNode.value
    const text = postTextInputNode.value

    postTitleInputNode.value = "";
    postTextInputNode.value = "";

    return {
        title: title,
        text: text
    }
}

function addPost({ title, text, }) {
    const date = getDate(t = new Date());

    posts.push({
        date: date,
        title: title,
        text: text,
    });


}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
            <div class='post'>
                <p class='post__date'>${post.date}</p>
                <p class='post__title'>${post.title}</p>
                <p class='post__text'>${post.text}</p>
            </div>
        `
    });



    postsNode.innerHTML = postsHTML;
}

