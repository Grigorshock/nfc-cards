
async function loadShop() {
    const params = new URLSearchParams(window.location.search);
    const shopId = params.get("shop") || "shop1";

    try {
        const response = await fetch("shops.json?v=2", {
        cache: "no-store"
        });
        if (!response.ok) throw new Error("Не удалось загрузить shops.json");

        const shops = await response.json();
        const shop = shops[shopId];

        if (!shop) {
            document.getElementById("shop-name").textContent = "Магазин не найден";
            document.getElementById("shop-description").textContent =
                "Проверьте ссылку на страницу.";
            document.querySelector(".actions").hidden = true;
            return;
        }

        document.title = shop.name || "Магазин";
        document.getElementById("shop-name").textContent = shop.name || "Магазин";
        document.getElementById("shop-description").textContent =
            shop.description || "";

        const yandexLink = document.getElementById("link-yandex");
        yandexLink.href = shop.yandex || "#";
        if (!shop.yandex) yandexLink.hidden = true;

        const menuLink = document.getElementById("link-menu");
        if (shop.menu && shop.menu.trim()) {
            menuLink.href = shop.menu;
        } else {
            menuLink.hidden = true;
        }
    } catch (error) {
        document.getElementById("shop-name").textContent = "Ошибка загрузки";
        document.getElementById("shop-description").textContent =
            "Не удалось загрузить данные магазина.";
        console.error(error);
    }
}

loadShop();
