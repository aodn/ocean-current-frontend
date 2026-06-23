// For URL pattern matching in waitForURL / navigation checks
export const URL_DATE_QUERY_REGEX = /[?&]date=\d{8}/;

// For exact value validation (e.g., extracted param, API response)
export const URL_DATE_PARAM_REGEX = /^\d{8}$/;

// For validating product file names
export const PRODUCT_FILE_REGEX = /^\d{14}$/;
