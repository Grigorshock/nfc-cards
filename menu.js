
const params = new URLSearchParams(window.location.search);
const shopId = params.get("shop");

async function loadShop() {
    const page = document.getElementById("page");

    try {
        const response = await fetch("shops.json?v=5", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Не удалось загрузить shops.json");
        }

        const shops = await response.json();
        const shop = shops[shopId];

        if (!shop) {
            throw new Error("Страница не найдена");
        }

        // Логотип
        if (shop.logo) {
            const logo = document.createElement("img");

            logo.src = shop.logo;
            logo.alt = "";
            logo.className = "shop-logo";

            logo.onerror = () => logo.remove();

            page.appendChild(logo);
        }

        // Заголовок
        if (shop.title) {
            const title = document.createElement("h1");

            title.textContent = shop.title;

            page.appendChild(title);
        }

        // Описание
        if (shop.description) {
            const description = document.createElement("p");

            description.textContent = shop.description;

            page.appendChild(description);
        }

        // Кнопки
        if (Array.isArray(shop.buttons)) {
            const buttonsContainer = document.createElement("div");

            buttonsContainer.className = "buttons";

            shop.buttons.forEach(button => {
                if (!button.text || !button.url) return;

                const link = document.createElement("a");

                link.textContent = button.text;
                link.href = button.url;
                link.className = "button";

                // Цвет фона
                if (button.color) {
                    link.style.backgroundColor = button.color;
                }

                // Цвет текста
                if (button.textColor) {
                    link.style.color = button.textColor;
                }

                buttonsContainer.appendChild(link);
            });

            if (buttonsContainer.children.length > 0) {
                page.appendChild(buttonsContainer);
            }
        }

    } catch (error) {
    console.error("Ошибка:", error);
    page.textContent = "Ошибка: " + error.message;
    }
}

loadShop();
