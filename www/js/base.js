
let listener = null;

const signOut = document.getElementById('signOut');
const loadDataWithListener = document.getElementById('loadData');
const removeListener = document.getElementById('cleanListener');
const dataDump = document.getElementById('showData');
const setAtValue = document.getElementById('setValue');
const removeAtValue = document.getElementById('removeAt');
const loadDataOnce = document.getElementById('loadDataOnce');
const updateAt = document.getElementById('updateAt');
const goOnline = document.getElementById('goOnline');
const goOffline = document.getElementById('goOffline');
const persistOn = document.getElementById('onPersist');
const persistOff = document.getElementById('offPersist');



signOut.addEventListener('click', (ev)=> {
    // clean up listner prior to navigating back to login ui.
    if (listener !== null) {
        FirebasePlugin.removeRealtimeDatabaseListener(listener, (val)=> {
            console.log('removed listener from realtimedb', [listener, val]);
        }, (err)=> {
            console.log('err', err)
        });
    }
    FirebasePlugin.signOutUser(()=> {
        // check app again and reset the login ui
        console.log('logout');
        checkSignIn();
        console.log('test',window.location);
    }, (err)=> {
        console.log('err', err);
    });
});

loadDataOnce.addEventListener('click', (e)=> {
    // test defined endpoint from database
    const urlPath = 'posts';
    // test null endpoint from database
    // const urlPath = 'play/pop';
    FirebasePlugin.fetchFromRealtimeDatabaseOnce(urlPath, (data)=> {
        console.log('data fetched once', data);
    }, (err) => {
        console.log('err', err);
    })
});

loadDataWithListener.addEventListener('click', (e) => {
    // test defined endpoint from database
    const urlPath = 'posts';
    // test null endpoint from database
    // const urlPath = 'play/pop';
    FirebasePlugin.fetchFromRealtimeDatabase(urlPath, (data)=> {
        console.log('data from database', data);
        if (data !== null) {
            console.log('das', Object.keys(data));
            if (Object.keys(data).includes('eventType')) {
                console.log('eventkeys included', data);
                listener = data.id;
                console.log('current listener', listener);
            } else {
                console.log('convert to snapshot from plugin data', data);
                dataDump.innerHTML = JSON.stringify(data, null, 4);
            }
        }
    }, (err)=> {
        console.log('err', err);
    });
});

removeListener.addEventListener('click', (ev)=> {
    FirebasePlugin.removeRealtimeDatabaseListener(listener, (val)=> {
        console.log('removed listener from realtimedb', [listener, val]);
        listener = null;
        console.log('removed listener', null);
    }, (err)=> {
        console.log('err', err)
    });
});

setAtValue.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    console.log('form', formData);
    // console.log('test', formData.getAll());
    const body = {};
    formData.forEach((v,k,p)=>{
        console.log('value, key, parent', [v,k,p]);
        body[k] = v;
    });
    console.log('formulated', body);
    const urlPath = 'play/points';
    FirebasePlugin.setInRealtimeDatabase(urlPath, body, (val)=> {
        document.getElementById('setValue').reset();
        console.log('data set at play/points', val);
    }, (err)=> {
        console.log('err', err);
    });

});

removeAtValue.addEventListener('click', (ev)=> {
    const urlPath = 'play/points';
    FirebasePlugin.deleteDocumentFromRealtimeDatabase(urlPath, (val)=> {
        console.log('data removed at play/points', val);
    }, (err)=> {
        console.log('test', err);
    });
});

updateAt.addEventListener('click', (e)=> {
    const objectForUpdate = {
        name:'king',
        occupation:'freeflow',
        specialisation:'air'
    }
    const path = 'clientB/org/kingOfAir';

    FirebasePlugin.updateChildrenInRealtimeDatabase(path, objectForUpdate, (updated)=> {
        console.log('updatedObject', updated);
    }, (err) => {
        console.log('test', err);
    });
});

goOnline.addEventListener('click', (e)=> {
    FirebasePlugin.realtimeDatabaseOnline(()=> {
        console.log('online');
    },(err) => {
        console.log('test', err);
    });
});

goOffline.addEventListener('click', (e)=> {
    FirebasePlugin.realtimeDatabaseOffline(()=> {
        console.log('offline');
    },(err) => {
        console.log('test', err);
    });
});

persistOn.addEventListener('click', (e) => {
    FirebasePlugin.setRealtimeDatabasePersistence(true, ()=> {
        console.log('persistence Enabled for database');
    },(err) => {
        console.log('test', err);
    });
});

persistOff.addEventListener('click', (e)=> {
    FirebasePlugin.setRealtimeDatabasePersistence(false, ()=> {
        console.log('persistence Enabled for database');
    },(err) => {
        console.log('test', err);
    });
});

