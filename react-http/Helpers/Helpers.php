<?php
namespace App\Helpers;
Use Config;
Use Redirect;
Use Session;
Use Input;
Use HTML;
Use URL;
Use DB;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\RegisteruserController;
use App\Http\Controllers\FeedController;
use Twilio\Rest\Client;
class Helpers
{
   
	public static function projectName()
    {
		 return 'myApplicationMentor';
    } 
	public static function getmainmail()
    {
		 return 'aanchal.img@gmail.com';
    } 
    public static function getUserNameShow($name,$email){
		if($name!=""){
			return ucwords($name);
		}else{
			return $email;
		}
    }
	public static function controllerName(){
		$routeArray = app('request')->route()->getAction();
		$controllerAction = class_basename($routeArray['controller']);
		list($controller, $action) = explode('@', $controllerAction);
		return $controller;
	}
	public static function actionName(){
		$routeArray = app('request')->route()->getAction();
		$controllerAction = class_basename($routeArray['controller']);
		list($controller, $action) = explode('@', $controllerAction);
		return $action;
	}
	public static function errormessage($errors){
		$content="";
		if($errors->any()){
			$content= implode('', $errors->all('<div class="error-message">:message</div>'));
		}
		return $content;
	}
	public static function getSessionMessage(){
		$content="";
		if (Session::has('message')){
			$content.='<div class="alert alert-info">'.Session::get('message').'</div>';
		}
		return $content;
	}
	public static function flashMessage(){
		if (Session::has('message')){
			$class="";
			$class = Session::get('alert-class');
			$message = Session::get('message');
			$content='<div class="alert '.$class.'">'.$message.'</div>';
			return $content;
		}
		else{
			$content="";
			return $content;
		}
	}
	public static function sendTextSMS($txtmsg,$mobile){
		// $mobile=str_replace('$$',',',$mobile);
		// $txtmsg=rawurlencode($txtmsg);
		// $url="http://sms.imgglobalinfotech.com/api/send_http.php?authkey=706b7ffed8ac4d47b4bbd9b0306735e2&mobiles=".$mobile."&message=".$txtmsg."&sender=MIMESY&route=B";
		// $ch = curl_init();
		// curl_setopt($ch, CURLOPT_URL, $url);
		// curl_setopt($ch, CURLOPT_HEADER, 0);
		// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		// curl_exec($ch);
		// curl_close($ch);
		require_once "vendor/twilio-php-master/Twilio/autoload.php";
		// $sid = 'AC4d8b4a0a15f38fa3b300170f1c2d815c';
		// $token = '00c7579b97c9c37e03b2eb5f3f54ce8c';
		// $clientvar = new Client($sid, $token);
		// $clientvar->messages->create(
			// $mobile,
			// array(
				// 'from' => '+1 716-221-8525',
				// 'body' => $txtmsg
			// )
		// );
		$sid = env('TWILIO_ACCOUNT_SID');
		$token = env('TWILIO_AUTH_TOKEN');
		$clientvar = new Client($sid, $token);
		$clientvar->messages->create(
			$mobile,
			array(
				'from' => env('TWILIO_NUMBER'),
				'body' => $txtmsg
			)
		);

	}
	
	public static function imageExtension($file){
		$filename = $file->getClientOriginalName();
		$extension = $file->getClientOriginalExtension();
		$ext = array('jpg','JPG','jpeg','gif','png');
		if(!in_array($extension, $ext)){
			return false;
		}
		return true;
	}
	public static function imageUpload($file,$destinationPath,$fileName){
		$array=array();
		foreach($file as $fileimage){
		    
				$filename = $fileimage->getClientOriginalName();
					$extension = $fileimage->getClientOriginalExtension();
					$ext = array('jpg','JPG','jpeg', 'gif', 'png');
					$newfilename = $fileName.'.'.$extension;
					if(file_exists($destinationPath.'/'.$newfilename)){
						$info=pathinfo($newfilename);
						$imageNamee=$info['filename'].'-'.rand(100,999);
						$newfilename=$imageNamee.".".$info['extension'];
					}
					$array[]=$newfilename;
					$upload_success = $fileimage->move($destinationPath, $newfilename);
					$resi = $destinationPath .'/'. $newfilename;
					$resizeimage=Helpers::resize_image($resi);
					$resizeimage=Helpers::compress_image($resi,80);
			 }
			  $imageNames = implode('{$}',$array);
			//  echo '<pre>';print_r($imageNames);die;
			  return $imageNames;
	}
	public static function compress_image($destination_url, $quality) {
		$sizeee = filesize($destination_url);
		if($sizeee>648576){
			$info = getimagesize($destination_url);
			if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($destination_url);
			elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($destination_url);
			elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($destination_url);
			imagejpeg($image, $destination_url, $quality);
		}
		return $destination_url;
	}
	public static function resize_image($destination_url){
		$info = getimagesize($destination_url);
		if($info['mime'] == 'image/jpeg' || $info['mime'] == 'image/jpg')
		{
			$src = imagecreatefromjpeg($destination_url);
		}
		else if($info['mime'] == 'image/png')
		{
			$src = imagecreatefrompng($destination_url);
		}
		else
		{
			$src = imagecreatefromgif($destination_url);
		}
		list($width,$height)=getimagesize($destination_url);
		if($width>850){
			$newwidth=850;
			$newheight=($height/$width)*$newwidth;
			$tmp=imagecreatetruecolor($newwidth,$newheight);
			imagecopyresampled($tmp,$src,0,0,0,0,$newwidth,$newheight,$width,$height);
			imagejpeg($tmp,$destination_url,80);
			imagedestroy($src);
			imagedestroy($tmp);
		}
		return $destination_url;
	}
	public static function dateformatforposting($date){
		$content="";
		date_default_timezone_set('Asia/Kolkata');
		$cpasttime=date('d-m-Y H:i:s', strtotime($date));
				$time_ago = strtotime($cpasttime);
				$time = date('d-m-Y H:i:s');
				$cur_time 	= strtotime($time);
				$time_elapsed 	= $cur_time - $time_ago;
				$seconds 	= $time_elapsed ;
				$minutes 	= round($time_elapsed / 60 );
				$hours 		= round($time_elapsed / 3600);
				$days 		= round($time_elapsed / 86400 );
				$weeks 		= round($time_elapsed / 604800);
				$months 	= round($time_elapsed / 2600640 );
				$years 		= round($time_elapsed / 31207680 );
			// Seconds
			if($seconds<0){
				$content.= "";
			}
			else if($seconds <= 60){
				$content.= "  $seconds seconds ago";
			}
			//Minutes
			else if($minutes <=60){
				if($minutes==1){
					$content.= " one minute ago";
				}
				else{
					$content.= "  $minutes minutes ago";
				}
			}
			//Hours
			else if($hours <=24){
				if($hours==1){
					$content.= "  an hour ago";
				}else{
					$content.= "  $hours hours ago";
				}
			}
			//Days
			else if($days <= 7){
				if($days==1){
					$content.=" yesterday at ".date('h:i A',strtotime($date));
				}else{
					// $content.= "  $days days ago ( ".date('M d, Y',strtotime($date)). ' at '.date('h:i A',strtotime($date)). ")";
					$content.= "  $days days ago ";
				}
			}
			else{
				$content.= date('M d, Y',strtotime($date));
			}
			return $content;
	}
	public static function getcountrieslist(){
		$getlist = DB::table('countries')->get();
		return $getlist;
	}
	public static function getUserCountry($getuserdata){
		if($getuserdata->country=='IN'){
			return 'india';
		}else{
			return 'others';
		}
	}
	public static function convertToRupees($totalamount){
		return round($totalamount*64.02);
	}
	public static function getUserCurrency($getuserdata){
		if($getuserdata->country=='IN'){
			return 'Rs.';
		}else{
			return '$';
		}
	}

	
}


?>