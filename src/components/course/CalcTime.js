function getUserTime(waste){

	const dayTime = 1440;
	let wasteTime = waste.split(':')
	let hour = parseInt(wasteTime[0])
	let min =  parseInt(wasteTime[1])
	//calcular total de minutos gastos
	let wasteMin = ((hour * 60) + min)
	let leftTimeNum = (dayTime-wasteMin)
	timeToStr(leftTimeNum)
	let wastePercent = ((wasteMin*100)/daytime)
}

function timeToStr(leftTime){
	let hourStr = (Math.floor(leftTime/60)).toString()
	let minStr = (leftTime%60).toString()
	if (minStr.length <= 1){
	minStr = ('0'.concat(minStr))
	}
	if (hourStr.length <= 1){
		hourStr = ('0'.concat(hourStr))
		}
	leftTimeStr = (hourStr.concat(':',minStr))
	return (leftTimeStr)
}
