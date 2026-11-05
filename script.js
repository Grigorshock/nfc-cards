async function loadShop() {
    const params = new URLSearchParams(window.location.search);
    const shopId = params.get("shop");

    const response = await fetch("shops.json");
    const shops = await response.json();

    const shop = shops[shopId];

    if (!shop) {
        document.getElementById("shop-name").textContent =
            "Магазин не найден";
        return;
    }

    document.title = shop.name;

    document.getElementById("shop-name").textContent = shop.name;
    document.getElementById("shop-description").textContent =
        shop.description;

    document.getElementById("link-2gis").href = shop["2gis"];
    document.getElementById("link-yandex").href = shop.yandex;
    document.getElementById("link-google").href = shop.google;
}

loadShop();
