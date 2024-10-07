<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="widthdevice-width, initial-scale=1.0">
    <title>Gina W's Grim Wyvern | WEB250 | Home</title>
    <link rel="stylesheet" href="styles/default.css">
    <script src="https://lint.page/kit/880bd5.js" crossorigin="anonymous"></script>
</head>

<body>
    <?php include 'contents/header.php'; ?>

    <?php
	$page = $_GET["page"] ?? 'home.php';
	//echo ("You picked the page: " . $page); 
	

    // Define allowed pages
    $allowedPages = ['contents/home.php', 'contents/introduction.php', 'contents/contract.php', 'contents/brand.php'];

    // Check if the requested page is allowed
    if (in_array($page, $allowedPages)) {
        include($page);
    } else {
        include('contents/home.php'); // Load default page if not allowed
    }
    ?>



    <?php include 'contents/footer.php'; ?>
</body>

</html>