var express = require('express');
const apiRouter = express.Router();

var devise_dao_mongoose = require('./devise-dao-mongoose');


//exemple URL: http://localhost:8282/devise-api/public/devise/EUR
apiRouter.route('/devise-api/public/devise/:code')
.get( function(req , res  , next ) {
	var codeDevise = req.params.code;
	devise_dao_mongoose.get_devise_by_code( codeDevise ,
									    function(err,devise){
											if(devise==null)
											   res.status(404).send({ err : 'not found'});
											else
										       res.send(devise);
									   });
	
});

//exemple URL: http://localhost:8282/devise-api/public/devise (returning all devises)
//             http://localhost:8282/devise-api/public/devise?changeMini=1.05
apiRouter.route('/devise-api/public/devise')
.get( function(req , res  , next ) {
	var changeMini = Number(req.query.changeMini);
	var criteria=changeMini?{ change: { $gte: changeMini } }:{};
	devise_dao_mongoose.get_devises_by_criteria(criteria,function(err,devises){
		   if(err) {
			   console.log("err="+err);
	       }
		   res.send(devises);
	});//end of get_devises_by_criteria()
});

// http://localhost:8282/devise-api/private/role-admin/devise en mode post
// avec { "code" : "mxy" , "nom" : "monnaieXy" , "change" : 123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.post( function(req , res  , next ) {
	var nouvelleDevise = req.body;
	console.log("POST,nouvelleDevise="+JSON.stringify(nouvelleDevise));
	devise_dao_mongoose.insert_new_devise (nouvelleDevise,
									     function(err){
											 if(err==null)
											   res.send(nouvelleDevise);
											 else 
											   res.status(500).send({err : "cannot insert in database" ,
											                         cause : err});
									    });
});

// http://localhost:8282/devise-api/private/role-admin/devise en mode PUT
// avec { "code" : "USD" , "nom" : "Dollar" , "change" : 1.123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.put( function(req , res  , next ) {
	var newValueOfDeviseToUpdate = req.body;
	console.log("PUT,newValueOfDeviseToUpdate="+JSON.stringify(newValueOfDeviseToUpdate));
	devise_dao_mongoose.update_devise (newValueOfDeviseToUpdate ,
	function(err){
			if(err){
				res.status(404).json({ err : "no devise to update with code=" + newValueOfDeviseToUpdate.code });
			}else{
					res.send(newValueOfDeviseToUpdate);
			 }
	});	//end of update_devise()
});

// http://localhost:8282/devise-api/private/role-admin/devise/EUR en mode DELETE
apiRouter.route('/devise-api/private/role-admin/devise/:code')
.delete( function(req , res  , next ) {
	var codeDevise = req.params.code;
	console.log("DELETE,codeDevise="+codeDevise);
	devise_dao_mongoose.delete_devise_by_code( codeDevise ,
									     function(err){
											 if(err)
											    res.status(404).send({ err : "not found , no delete" } );
											 else
										        res.send({ deletedDeviseCode : codeDevise } );
									    });
});

exports.apiRouter = apiRouter;