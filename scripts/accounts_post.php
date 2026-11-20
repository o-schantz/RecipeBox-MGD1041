<html>
<body>

<?php 
    $newUsername = $_POST["usernameCreate"];
    $newPassword = $_POST["passwordCreate"];
    $newPasswordConfirm = $_POST["passwordConfirm"];
    $existingUsername = $_POST["usernameEnter"];
    $existingPassword = $_POST["passwordEnter"];
?>

<?
    if (isset($_POST["usernameCreate"])) && !empty ($_POST["usernameCreate"]) && (isset($_POST["passwordCreate"])) && !empty ($_POST["passwordCreate"]) 
{
?>
    <h1>Welcome new user <?php echo $_POST["usernameCreate"];?> </h1>
<? } else {
    if (empty($usernameCreate)) { ?> <p style="color:rgb(255, 0, 0)";>Please provide a username</p> <? }?>
    <?if (empty($passwordCreate)) { ?> <p style="color:rgb(255, 0, 0)";>Please provide a password</p> <? } }
?>


<?
if (isset($_POST["usernameEnter"])) && !empty ($_POST["usernameEnter"]) && (isset($_POST["passwordEnter"])) && !empty ($_POST["passwordEnter"]) {
?>
Welcome returning user <?php echo $_POST["usernameEnter"]; ?>
<?
}
?>




</body>
</html>