// const isChildLock = window.location.href.includes('childlock');
//
// if (isChildLock) {
//     document.querySelectorAll('.censor').forEach(el => {
//         el.classList.add('censored');
//     });
// }

    // gpt generated code

    (() => {
    const childlock = location.href.includes("childlock");
    if (!childlock) return;

    document.querySelectorAll(".censor")
    .forEach(el => el.classList.add("censored"));

    const notice = document.getElementById("childlock-notice");
    notice.hidden = false;

    document.getElementById("childlock-notice").onclick = () => {
    notice.hidden = true;
};
})();

