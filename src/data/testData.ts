export const CREDENTIALS = {
    VALID_USER: {
        USERNAME: "standard_user",
        PASSWORD: "secret_sauce"
    },
    INVALID_USER: {
        USERNAME: "invalid_user",
        PASSWORD: "wrong_password"
    }
};

export const URLS = {
    LOGIN_PAGE: "https://www.saucedemo.com/",
    INVENTORY_PAGE: "https://www.saucedemo.com/inventory.html",
    CART_PAGE: "https://www.saucedemo.com/cart.html",
    CHECK_OUT_STEP_ONE: "https://www.saucedemo.com/checkout-step-one.html",
    CHECK_OUT_STEP_TWO: "https://www.saucedemo.com/checkout-step-two.html",
    CHECK_OUT_COMPLETE: "https://www.saucedemo.com/checkout-complete.html"
};

export const ERRORS = {
    BAD_CREDENTIALS: "Epic sadface: Username and password do not match any user in this service",
    MISSING_PASSWORD: "Epic sadface: Password is required",
    MISSING_USERNAME: "Epic sadface: Username is required",
    CART_IS_EMPTY_ERROR: "Error: Cart is empty",
};

export const CHECKOUT_DETAILS= {
    VALID : {
        FIRST_NAME: "Bugs",
        LAST_NAME: "Bunny",
        ZIP_CODE: "123456"
    }
};
export enum SORT_OPTIONS {
    PRICE_HIGH_TO_LOW = "hilo",
    PRICE_LOW_TO_HIGH = "lohi",
    NAME_A_TO_Z = "az",
    NAME_Z_TO_A = "za"
};

