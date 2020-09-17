// document.addEventListener('DOMContentLoaded', () => {
//     if (document.querySelector('.add-main-steps')) {
//         modelsSelectTabs();
//         stepsInit();
//         backBtnBind();
//         document.querySelector('.goToSecondStep').addEventListener('click', (e) => {
//             goToStep(2);
//         });
//         document.querySelector('.goToThirdStep').addEventListener('click', (e) => {
//             goToStep(3);
//         });
//         document.querySelector('.goToFourthStep').addEventListener('click', (e) => {
//             goToStep(4);
//         });
//         document.querySelector('.goToFifthStep').addEventListener('click', (e) => {
//             goToStep(5);
//         });
//     }
// });

// // bind Кнопок назад/вперед в первом этапе добавления авто
// const modelsSelectTabs = () => {
//     if (document.querySelector('.step-marca')) {
//         const tabs = Array.from(document.querySelectorAll('.step-marca > *'));
//         const triggersNext = document.querySelectorAll('.step-marca-list-items > a, .step-marca-models__list > a');
//         const triggersBack = document.querySelectorAll('.step-marca-models__back');
//         triggersNext.forEach(element => {
//             element.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 stepMarcaSwitch(tabs, 'next');
//             });
//         });
//         triggersBack.forEach(element => {
//             element.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 stepMarcaSwitch(tabs, 'prev');
//             });
//         });
//     }

//     // переключение назад / вперед
//     const stepMarcaSwitch = (tabs, dir) => {
//         const tabsLen = tabs.lentgh;
//         let index = 0;
//         tabs.forEach(each => {
//             if (each.classList.contains('is-active')) {
//                 index = tabs.indexOf(each);
//             }
//         });
//         tabs.map(el => el.classList.remove('is-active'));
//         if (dir == 'next') {
//             tabs[index + 1].classList.add('is-active');
//         } else if (dir == 'prev') {
//             tabs[index - 1].classList.add('is-active');
//         }
//     }
// };

// // Переключение к нужному шагу
// const goToStep = (stepNumber) => {
//     const allSteps = Array.from(document.querySelectorAll('.add-main-steps > *'));
//     const navItems = Array.from(document.querySelectorAll('.add-nav-steps > a'));
//     const stepsCount = allSteps.length;
//     const stepsCounterInner = document.querySelector('.add-nav__title span');
//     allSteps.map(el => el.classList.remove('is-active'));
//     navItems.map(el => {
//         el.classList.remove('is-active');
//         el.classList.remove('is-done')
//     });
//     for (let i = 0; i < (stepNumber - 1); i++) {
//         navItems[i].classList.add('is-done');
//     }
//     allSteps[stepNumber - 1].classList.add('is-active');
//     navItems[stepNumber - 1].classList.add('is-active');
//     stepsCounterInner.innerHTML = stepNumber;
// };

// // Бинд и отслеживание кнопок в правом окошке навигации по шагам

// const stepsInit = () => {
//     const allSteps = Array.from(document.querySelectorAll('.add-main-steps > *'));
//     const navItems = Array.from(document.querySelectorAll('.add-nav-steps > a'));
//     const stepsCounterInner = document.querySelector('.add-nav__title span');
//     const stepsCount = allSteps.length;
//     for (let i = 0; i < stepsCount; i++) {
//         navItems[i].addEventListener('click', (e) => {
//             goToStep(i + 1);
//         });
//     }
//     allSteps[0].classList.add('is-active');
//     navItems[0].classList.add('is-active');
//     stepsCounterInner.innerHTML = '1';
// };

// // Бинд кнопки назад

// const backBtnBind = () => {
//     const allBackBtns = Array.from(document.querySelectorAll('.add-main__step-back'));
//     const allSteps = Array.from(document.querySelectorAll('.add-main__step'));
//     allBackBtns.forEach(each => {
//         each.addEventListener('click', () => {
//             const parent = each.parentNode.parentNode;
//             let index = allSteps.indexOf(parent);
//             goToStep(index);
//         });
//     });
// };