function querySelectorAll(selector) {
    // result
    const result = [];
    // find all element, which match
    function searchInElement(element) {
        if (element.matches && element.matches(selector)) {
            result.push(element);
        }

        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            searchInElement(children[i]);
        }
    }

    // dfs, search from root
    searchInElement(document.documentElement);

    return result;
}
module.exports = {
    querySelectorAll
};