<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PaymentSet extends CI_Controller
{
	public function __construct()
	{
		
		error_reporting(1);
		parent::__construct();
		// $this->load->model('get_details');
		$this->load->database();
		// $this->load->model('response_pay');
		// $this->load->model('agents_model');
		// $this->load->model('common_model');
		$this->load->model('request_response_save_model');
		
	}
	
	public function checkinsertcronpayment($qid,$insertId,$company,$datas){
		
		$this->db->insert("payment_failed_track",['request_response_id'=>$insertId,'quotation_id'=>$qid,'company'=>$company,'datas'=>$datas,'add_stamp'=>date('Y-m-d H:i:s')]);
		$insert_id2 = $this->request_response_save_model->payemnt_track_group($insertId,$qid,$company);
		$insert_id = $this->request_response_save_model->payemnt_track($insertId,$qid,$company,$datas,date('Y-m-d H:i:s'));
	}

	public function SessionSet(){
		
        ?>
        
        
        <script type="text/javascript" src="https://www.squareinsurance.in/assets/newdesign/js/jquery_min.js"></script>


 
<?php 
		
		
	 
	
		$decode = isset($_REQUEST['decode']) ? $_REQUEST['decode'] : '';
		if ($decode != '') {
			$convertsbase64decode = json_decode(base64_decode($decode));
			// print_r($convertsbase64decode);
			 $ExtraField='';

			 $company = $convertsbase64decode->company;
			 $gadi_types = $convertsbase64decode->gadi_type;
			 $PremiumAmount = $convertsbase64decode->PremiumAmount;
			 $TaxAmount = $taxs=$convertsbase64decode->TaxAmount;
			 $NetPremium=$premeuim=$convertsbase64decode->NetPremium;   
			 $quote_id = base64_decode($convertsbase64decode->quote_id);
			 $Platform = $convertsbase64decode->Platform;
			 $BindingProposalIdToPayment = $convertsbase64decode->BindingProposalIdToPayment;
			 $TransactionID = $convertsbase64decode->TransactionID;
			
			//~ print_r($convertsbase64decode);
			//~ die;
			
			 $checkAlreayPayment=$this->db->query("select payment_status from policy_details where quotation_id='".$quote_id."' and payment_status='1'")->num_rows();
			 
			 
			
			 
			
			 if($checkAlreayPayment=='1'){
				 
				 redirect(base_url());
				 exit();
			 }
			 
			 
			 
			 $PaymentParms=base64_decode($_REQUEST['decode']);
			 $PaymentURLS=$_SERVER['REQUEST_URI'];
			 
			 
			    $GadiTypeLabel='';
				if($gadi_types=='1'){
					
					$GadiTypeLabel='tw';
				}
				else if($gadi_types=='2'){
					
					$GadiTypeLabel='pc';
				}
				else if($gadi_types=='3'){
					
					$GadiTypeLabel='pcv';
				}
				else if($gadi_types=='4'){
					
					$GadiTypeLabel='gcv';
				}
				else if($gadi_types=='5'){
					
					$GadiTypeLabel='miscd';
				}
			
			 
			 $resultCheck =json_decode(file_get_contents(base_url().'api_quotes/get_quote/square123123/'.$quote_id.'/'.$GadiTypeLabel.'/'.$company.'?ActionPayment=PaymentFinal&Platform='.$Platform),True);
			 
			
			
			
			//~ print_r($resultCheck);
			 if(is_array($resultCheck) && !empty($resultCheck)){
			
			     
				 if(isset($resultCheck['status']) && $resultCheck['status']=='1'){
				     
				    // print_r($resultCheck);
					 $datas['error'] = '';
					 $data_app['status'] = '1';
					 $data_app['msg'] = 'Success';
					 $data_app['DisplayMsg'] = 'hide';
					 
				 }
				 else{
			            //print_r($resultCheck);
				   $data_app['msg']=$resultCheck['msg'];
				   $data_app['error'] = $resultCheck['msg'];
				   $data_app['DisplayMsg'] = 'show';
				}

			 }
			 else{
			
				   $data_app['msg']='invalid json  on quote';
				   $data_app['error'] = 'invalid json  on quote';
				   $data_app['DisplayMsg'] = 'show';
			}
			//~ echo $data_app['status'];
			//~ die;
			
			 if($quote_id=="SQPC2022091113494092473"){
				 // print_r($resultCheck);
				 // exit;
			 }
			
			if($data_app['status']!='1'){
			   // print_r($resultCheck);
				// exit;
				 $this->session->set_userdata('ErrorMsg','Something Went Wrong, Please contact to IT Team');
				  redirect(base_url().'review_pay/index/'.$quote_id);
				  exit();
			}
			 
			
			 if ($company == 'digit') { //digit

				
				  $ProposalNumber = $convertsbase64decode->ProposalNumber;
            	  $query = $this->db->query("update policy_details set extra_field='".$TransactionID."' where quotation_id='".$quote_id."' ");
				//style="display:none;"
			?>

				<a href="<?= $ProposalNumber ?>" id="SubmitForms" >Proceed to Pay</a>
                
        


			<?php
			
			

			} //digit
			

			  
			$status=1;
			$msg='Success';
			$grossPremis=$PremiumAmount;
			$taxs=$TaxAmount;
			$premeuim=$NetPremium;
			$request=$PaymentParms;
			$response=$PaymentURLS;
			$error=$TransactionID;
			
			//error_text column is TransactionID and request_proposal column is is reff for connect to BindingProposalIdToPayment
			
			//request2 column is for ExtraField
			
			
			// $insert_ids = $this->request_response_save_model->common_fetch_request_response_quote($status,$msg,'PaymentBefore',$grossPremis,$taxs,$premeuim,$request,$response,$error,$gadi_types,$company,$quote_id,$ExtraField,'',$Platform,$BindingProposalIdToPayment);
			
			
			// $this->checkinsertcronpayment($quote_id,$insert_ids,$company,base64_decode($decode));
			
			?>

            
	
			<!-- <script>
			
				 setTimeout(function() {
					  alert();
					 var Companys='<?= $company?>';
					 if(Companys=='iffco' || Companys=='raheja' || Companys=='universal' || Companys=='hdfc' || Companys=='acko' || Companys=='bharti'){
						 
						 localStorage.setItem("qid", "<?=$quote_id?>");
					 }
					 else{
						 localStorage.removeItem("qid");
					 }
					 //~ alert(localStorage.getItem("qid"));
				     document.getElementById('SubmitForms').click();
				 }, 200);
			</script> -->

            <script>
$( document ).ready(function() {
				   alert();
				});
</script>
			<?php
		}
	}
	


	public function  SessionSet2(){
?>	   
 
	<?php 
	}
	


}
