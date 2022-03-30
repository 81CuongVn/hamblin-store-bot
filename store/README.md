# Instructions
Replace your store template v2's `/cart/retrieveOrder.php` file with the one that inside of the `cart` folder in this download.
This will allow for the license system to work properly.

Next, add the following **somewhere** inside of your `config.php` file.

<!-- IGNORE THE ``` MARKS -->
```php

    // Start Copying Below Me

        // Hamblin Store Bot (https://devwrld.xyz/shop/hamblin-store-bot)
        $useLicensing = false; // If you want to enable the license system built into the Hamblin Store Bot. (by Hyperz#0001)
        $licensingWebhook = "YOUR_DISCORD_WEBHOOK_URL"; // The webhook to send private data to when purchases are made. (should be a private channel only you and the bot can see)

    // Stop copying above me

```
<!-- IGNORE THE ``` MARKS -->

# Note
Jake Hamblin has given permission for this to be implemented into this download.
Proof: https://cdn.hyperz.net/main/8nA9cf.png