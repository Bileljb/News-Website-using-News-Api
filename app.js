
var url = 'https://newsapi.org/v2/everything?' +
    'q=tesla&' +
    'from=2024-03-01&' +
    'sortBy=publishedAt&' +
    'apiKey=5ddab993bc824b8cabbac51399add8f2';

var req = new Request(url);

fetch(req)
    .then(function (response) {
        return response.json()

    })
    .then((data) => {
        let articles = data.articles.filter(article => {
            return article.urlToImage != null
        })

        articles.forEach(article => {
            const news_container = document.querySelector(".card-container")
            const article_card = document.createElement("div")
            article_card.classList.add("card")

            const link = document.createElement("a")
            link.href = article.url
            link.target = "_blank"

            if (article.urlToImage) {
                article_card.style.backgroundImage = `url(${article.urlToImage})`;
            }

            const title_el = document.createElement("p")
            title_el.classList.add("title")
            title_el.textContent = article.title

            const author_el = document.createElement("p")
            author_el.classList.add("author")
            author_el.textContent = article.author

            const description_el = document.createElement("p")
            description_el.classList.add("description")
            description_el.textContent = article.description

            const color_overlay = document.createElement("div")
            color_overlay.classList.add("overlay")
            color_overlay.appendChild(title_el)
            color_overlay.appendChild(author_el)
            color_overlay.appendChild(description_el)

            article_card.appendChild(color_overlay)


            link.appendChild(article_card)
            news_container.appendChild(link)

            const filterInput = document.querySelector(".search-inp");
            const filterBtn = document.querySelector(".search-btn");
            const links = document.querySelectorAll(".card-container a");
            function filterNews() {
                const filterInputValue = filterInput.value.toLowerCase()
                links.forEach(link => {
                    const articleCard = link.firstElementChild;
                    const text = articleCard.querySelector(".title").textContent.toLowerCase();
                    if (text.includes(filterInputValue)) {
                        link.style.display = "block"
                    } else {
                        link.style.display = "none"
                    }
                })
            }
            filterBtn.addEventListener('click', filterNews)

        });

    })
