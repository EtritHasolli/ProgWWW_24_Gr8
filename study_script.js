document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;  // Track the current "page pair"
    const pages = document.querySelectorAll('.page');
    const totalPages = Math.ceil(pages.length / 2);  // Each pair of pages counts as one "book spread"

    function showPages(pageNumber) {
        pages.forEach((page, index) => {
            const leftPageIndex = (pageNumber - 1) * 2;  // Left page in the spread
            const rightPageIndex = leftPageIndex + 1;    // Right page in the spread

            if (index === leftPageIndex || index === rightPageIndex) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            showPages(currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            showPages(currentPage);
        }
    }

    // Initially show the first pair of pages
    showPages(currentPage);

    // Make prevPage and nextPage globally accessible
    window.prevPage = prevPage;
    window.nextPage = nextPage;
});
