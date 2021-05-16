/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

let FirebasePlugin;
let singlePageAppBody;
let isAuth;
let userProfile;
let currentView = null;
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    FirebasePlugin = window.FirebasePlugin;
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    singlePageAppBody = document.getElementById('singlePageBody');
    // check if user is signed in
    checkSignIn();

}

getTemplate = (url) => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        // xhr.onload = function () {
        //     resolve(new Response(xhr.response, { status: xhr.status }))
        // }
        xhr.onreadystatechange = (ev) => {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = function () {
            reject(new TypeError('Local request failed'))
        }
        xhr.open('GET', url, true);
        xhr.send(null)
    });
};

loadLoginView = () => {
    const loginTemplateUrl = 'template/login.html';
    getTemplate(loginTemplateUrl).then((template)=> {
        console.log('body login template', template);
        singlePageAppBody.innerHTML = template;
        currentView = 'login';
        loadController('login');
    }).catch((reject)=> {
        console.log('');
    });
}

loadBaseView = () => {
    const baseTemplateUrl = 'template/base.html';
    getTemplate(baseTemplateUrl).then((template)=> {
        currentView = 'base'
        console.log('body base template', template);
        singlePageAppBody.innerHTML = template;
        loadController('base');
    }).catch((reject)=> {
        console.log('');
    });
};

loadController = (controllerName) => {
    if (controllerName !== undefined || controllerName !== null) {
        console.log(document.getElementById(controllerName+'script'));
        if (document.getElementById(controllerName+'script') === null) {
            const current = document.createElement('script');
            current.setAttribute('id', controllerName+'script');
            current.setAttribute('src','js/'+ controllerName+'.js');
            document.body.appendChild(current);
        }
    }
}

clearSinglePageApp = () => {
    singlePageAppBody.innerHTML = '';
    currentView = null;
};

checkSignIn = () => {
    FirebasePlugin.isUserSignedIn(function(isSignedIn) {
        console.log("User "+(isSignedIn ? "is" : "is not") + " signed in");
        if (!isSignedIn) {
            loadLoginView();
        } else {
            loadBaseView();
            FirebasePlugin.getCurrentUser((user)=> {
                userProfile = user;
            }, (err) => {
                console.error(err);
            });
        }
        isAuth = isSignedIn;
    }, function(error) {
        console.error("Failed to check if user is signed in: " + error);
    });
}


