const userName = document.getElementById('username');
const userPass = document.getElementById('userPass');
const error = document.getElementById('error');
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const email = data.get('username');
    const password = data.get('userpassword');
    FirebasePlugin.signInUserWithEmailAndPassword(email, password, ()=> {
        // clear form to prevent weird effect.
        document.getElementById('loginForm').reset();
        loadBaseView();
        FirebasePlugin.getCurrentUser((user)=> {
            userProfile = user;
        }, (err) => {
            console.error(err);
        });
    }, (err)=> {
        console.error(err);
    });
});


