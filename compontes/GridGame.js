import React,{useState} from 'react';
import { StyleSheet, Text, View,Button,Dimensions,TouchableOpacity} from 'react-native';
var width = Dimensions.get('window').width;

function isWin(mat){
    return isVerticalWin(mat);
}
function isVerticalWin(mat){
    for(var i=0;i<3;i++){
        if(isColWin(mat,i)) return true;
    }
    return false;
}
function isColWin(mat,col){
    if(mat[0][col]==" ") return false;
    var tmp = mat[0][col];
    for(var i=0;i<3;i++){
        if(mat[i][col]!=tmp) return false;
    }
    return true;
}

function GridGame(){
    var [win,setWin] = useState(false);
    var [player, setPlayer] = useState("X");
    var [mat,setMat] = useState([[" "," "," "],[" "," "," "],[" "," "," "]]);
    var li = [0,1,2];
    if(!win){
    return(
        <React.Fragment>
        <Text style={style.title}>Tricky</Text>
        {li.map((row)=>{
            return (<View style={style.row}>
                {li.map((col)=><TouchableOpacity style={style.button} onPress={()=>{
                    if(mat[row][col]!=" ") return;
                    mat[row][col]=player;
                    setMat(mat);
                    if(isWin(mat)){ 
                        setWin(true);
                        return;
                    }
                    if(player=="X") setPlayer("O");
                    else setPlayer("X");
                }}>
                    <Text style={style.text}>
                    {mat[row][col]}
                    </Text>
                </TouchableOpacity>)}
            </View>
            )
        })}
        <Button title="restart" onPress={()=>{
            setPlayer("X");
            setMat([[" "," "," "],[" "," "," "],[" "," "," "]]);
        }}></Button>
        </React.Fragment>
    )
    }else{
        return(<React.Fragment>
            <Text style={style.text2}>The winner was {player}</Text>
            <Button title="restart" onPress={()=>{
                setWin(false);
                setPlayer("X");
                setMat([[" "," "," "],[" "," "," "],[" "," "," "]]);
            }
        }></Button>
        </React.Fragment>)
    }
}
var style = StyleSheet.create({
    title:{
        fontSize:70
    },
    row:{
        flexDirection:"row",
        flexWrap:"wrap",
        height:'20%'
    },button:{
        fontSize:100,
        backgroundColor:'blue',
        borderColor:'white',
        borderWidth:2,
        width:'33.3%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center'
    },text:{
        color:'white',
        fontSize:100,
    },text2:{
        fontSize:40
    }
});
export default GridGame;