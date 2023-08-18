// public styles
import '@viivue/atomic-css';
import 'honcau';

// private style
import './style.scss';

// source script
import '@/_index';

// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `${title}`;
document.querySelector('[data-title]').innerHTML = title;

/**
 * Lib usage
 */

function highlightLabel(){
    const label = document.querySelector(`[data-event=onHashchange]`);

    label.classList.add('active');

    setTimeout(() => {
        label.classList.remove('active');
    }, 300);
}


HashManager.on('change', () => {
    highlightLabel()
    console.log(HashManager)
})


const inputAddHash = document.querySelector('input[name="add-hash"]');
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const state = btn.getAttribute('data-btn');

        switch(state){
            case "add":
                // HashManager.add(inputAddHash.value);
                HashManager.add({a: 1, b: 2});
                break;
            case "remove":
                HashManager.remove();
                break;
        }
    })
});


