// FormFinder Script by @divadbate


function scan(ps, msg, src) {
    var alertRisk = 1
    var alertReliability = 3
    var alertTitle = 'Formfinder (script)'
    var alertDesc = 'Forms were found'
    var alertSolution = ''
    var cweId = 0
    var wascId = 0

	//regex
    var re = /<([fF]orm|[iI]nput)>|([mM]ethod)="(...|....|.....|......)"|="([Ss]ubmit)"/g

	// we need to set the url variable to the request or we cant track the alert later
    var url = msg.getRequestHeader().getURI().toString();

	// exclude certain content types
    var contenttype = msg.getResponseHeader().getHeader("Content-Type")
	var unwantedfiletypes = ['image/png', 'image/jpeg','image/gif','application/x-shockwave-flash','application/pdf','application/javascript']
	
	if (unwantedfiletypes.indexOf(""+contenttype) >= 0) {
		// if we find one of the unwanted headers quit this scan
    		return
	}else{
	//regex against the body response
        var body = msg.getResponseBody().toString()
        if (re.test(body)) {
            re.lastIndex = 0 
          
            var foundForm = []
            var comm
            while (comm = re.exec(body)) {
                foundForm.push(comm[0]);
            }
		  // form found
            ps.raiseAlert(alertRisk, alertReliability, alertTitle, alertDesc, url, '', '', foundForm.toString(), alertSolution, '', cweId, wascId, msg);
        }
    }
}
