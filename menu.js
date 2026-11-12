
const params = new URLSearchParams(window.location.search);
const shopId = params.get("shop");

async function loadShop() {
    try {
        const response = await fetch("shops.json?v=3", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Не удалось загрузить shops.json");
        }

        const shops = await response.json();
        const shop = shops[shopId];

        if (!shop) {
            throw new Error("Магазин не найден");
        }

        // Логотип
        const logo = document.getElementById("shop-logo");

        if (shop.logo) {
            logo.src = shop.logo;
            logo.hidden = false;

            logo.onerror = () => {
                logo.hidden = true;
            };
        }

        // Кнопка меню
        const menuLink = document.getElementById("link-menu");

        if (shop.menu && shop.menu.trim()) {
            menuLink.href = shop.menu;
            menuLink.hidden = false;
        }

        // Кнопка отзыва
        const reviewLink = document.getElementById("link-review");

        if (shop.review && shop.review.trim()) {
            reviewLink.href = shop.review;
            reviewLink.hidden = false;
        }

    } catch (error) {
        console.error(error);
    }
}

loadShop();
