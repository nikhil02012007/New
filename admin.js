document.getElementById('postForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let title = document.getElementById('postTitle').value;
  let content = document.getElementById('postContent').value;
  let date = new Date().toLocaleDateString();

  let newPost = {
    title: title,
    content: content,
    date: date
  };

  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));

  // Clear form after submission
  document.getElementById('postForm').reset();
  alert("Post added successfully!");

  // Redirect to home page
  window.location.href = 'index.html';
});

