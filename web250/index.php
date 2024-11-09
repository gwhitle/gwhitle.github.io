<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="widthdevice-width, initial-scale=1.0">
    <title>Gina W's Grim Wyvern | Home</title>
    <link rel="stylesheet" href="styles/default.css">
    <link rel="icon" href="images/favicon1.ico" type="image/x-icon">
    <script src="https://lint.page/kit/880bd5.js" crossorigin="anonymous"></script>
</head>

<body>
    <?php include 'contents/header.php'; ?>

    <?php
	$page = $_GET["p"] ?? 'home';
	//echo ("You picked the page: " . $page); 
	

    // Define allowed pages
    $allowedPages = ['home', 'introduction', 'contract', 'brand'];

    // Check if the requested page is allowed
    if (in_array($page, $allowedPages)) {
        include('contents/' . $page . '.php');
    } else {
        include('home.php'); // Load default page if not allowed
    }
    ?>



    <?php include 'contents/footer.php'; ?>
</body>

</html>