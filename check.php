<!DOCTYPE HTML>
<html>
<head>
<title>BAJTIX BETA</title>
<meta charset="utf-8">
<link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/NYCS-bull-trans-B.svg/1024px-NYCS-bull-trans-B.svg.png"/>

</head>
<body>

<style>
 body
 {
	 font-family: 'Indie Flower', cursive;
	 background-color: black;
	 color: white;
	 
 }
</style>

<center>
	<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/NYCS-bull-trans-B.svg/1024px-NYCS-bull-trans-B.svg.png" width="500" height="500" />
	<h1 style="color: white">BAJTIX BETA PROGRAM</h1>
	
	


	
	
	<h1 style="color: white; font-size: 90px;">Validating invite code: <?php echo $_POST['code']; ?></h1> <br><br>
	<?php 
	$code = $_POST['code'];
	$len = strlen($code);
	$prefix = substr($code,0,2);
	//echo $prefix;
	
	if ($len == 8)
	{
	    $file = 'usedcodes/m.data';
	    
		$a = substr($code,2,1);
		$b = substr($code,3,1);
		$c = substr($code,4,1);
		$d = substr($code,5,1);
		$e = substr($code,6,2);
		$sum = $a+$b+$c+$d + 6;
		//echo $a;
		//echo $b;
		//echo $c;
		//echo $d;
		//echo $sum;
		if($sum == $e)
		{
				if($prefix == "ol"){
					//header('Location: programs/ol/otherLand.html');
				    
				    $tm = file_get_contents($file);
				    $tmp = strpos($tm,$code);
				    if($tmp == false)
				    {
				        echo '<a href="programs/ol/otherland.html">CONTINUE</a><br/>';
				        $tm .= "\n".$code;
				        file_put_contents($file,$tm);
				    }
				    else
				        echo '<a href="index.php">This code was used before! Ask for a new one!</a><br/>';
				        echo '<a href="https://bajtixb.wixsite.com/codereq">Request a new Code</a>';
				}
		}	
		else
			echo '<a href="index.php">INCORRECT CODE! TRY AGAIN -CLICK HERE-</a>';
		
	}
	else
		echo '<a href="index.php">INCORRECT CODE! TRY AGAIN -CLICK HERE-</a>';
	
	
	?>
	
	
	

</center>
</body>
</html>