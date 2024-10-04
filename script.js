// Check if the user is admin (after login)
const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

window.onload = function () {
  loadPosts();
};

function loadPosts() {
  let postList = document.getElementById('post-list');
  postList.innerHTML = '';

  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  posts.forEach(function (post, index) {
    let postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // Show only 100 characters initially
    let previewContent = post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content;
    
    let postContent = `
      <h3>${post.title}</h3>
      <p class="post-content">${previewContent}</p>
      <button class="read-more" data-fullcontent="${post.content}">Read More</button>
      <p><small>Posted on: ${post.date}</small></p>
    `;

    // Add delete button only if the user is admin
    if (isAdmin) {
      postContent += `<button class="delete-btn" onclick="deletePost(${index})">Delete</button>`;
    }

    postDiv.innerHTML = postContent;
    postList.appendChild(postDiv);

    // Attach "Read More" button event
    const readMoreBtn = postDiv.querySelector('.read-more');
    readMoreBtn.addEventListener('click', function () {
      let contentElem = postDiv.querySelector('.post-content');
      let fullContent = readMoreBtn.getAttribute('data-fullcontent');
      
      if (readMoreBtn.textContent === 'Read More') {
        contentElem.textContent = fullContent;
        readMoreBtn.textContent = 'Show Less';
      } else {
        contentElem.textContent = previewContent;
        readMoreBtn.textContent = 'Read More';
      }
    });
  });
}

function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  loadPosts();
}