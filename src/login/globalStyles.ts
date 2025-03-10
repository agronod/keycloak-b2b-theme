import { css } from "@emotion/react";

export const globalStyles = css`
    html,
    body {
        width: 100%;
        height: 100%;
        font-size: 16px;
    }

    #root {
        display: grid;
        grid-template-rows: auto 1fr;
        min-height: 100%;
    }

    #kc-header {
        display: none;
    }

    .login-pf-page .card-pf {
        padding: 20px 0 30px 0;
    }

    #kc-form .form-group {
        margin-bottom: 0;
        margin-top: 0;
    }

    #kc-form .form-group .form-control {
        height: auto;
    }

    .form-horizontal .form-group {
        margin: 0;
    }

    #kc-form-buttons {
        margin: 0;
    }

    #kc-content .alert {
        border-radius: 20px;
        padding: 14px;
        display: flex;
        align-items: center;
        gap: 14px;
    }

    #kc-content .alert .pficon {
        position: unset;
    }

    #kc-content .alert.alert-error {
        border-color: #f7c7d3;
        background-color: #fcecee;
    }

    #kc-content .alert.alert-success {
        border-color: #cee5cb;
        background-color: #eaf5ea;
    }
`;
