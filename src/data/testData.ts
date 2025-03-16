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
    LOGIN_PAGE: "/",
    INVENTORY_PAGE: "/inventory.html",
    CART_PAGE: "/cart.html",
    CHECK_OUT_STEP_ONE: "/checkout-step-one.html",
    CHECK_OUT_STEP_TWO: "/checkout-step-two.html",
    CHECK_OUT_COMPLETE: "/checkout-complete.html"
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

