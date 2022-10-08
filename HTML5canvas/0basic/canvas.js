var canvas = document.querySelector("#canvas");

// document, window 객체 추가 공부 필요 ! 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 캔버스객체의 가로,세로 길이 지정방식. = 윈도우 객체의 innerWidth 함수


var c = canvas.getContext('2d');
// c 로 정의한 객체는 2d 객체만 다룰것.
// 아래것처럼.
for(var i=0;i < 10; i++){
    c.fillStyle = "rgba(255," + 50*i + ",0,0.5)"
    // 요런식으로도 색상채우기는 가능하다.
    c.fillRect(150*i, 100, 100, 100);
}
console.log(canvas);


// Line 긋기

c.beginPath();
// 길의 시작점
c.moveTo(30, 300);
// 시점 ! 시점은 하나만, 중첩이 불가능하다.
// c.moveTo(30, 400);
// 위 구문을 추가해버리면 시점이 초기화되는 셈이다.
c.lineTo(300, 100);
// 종점 ! 종점은 중첩이 가능하다. 다시말해 다음 종점이 추가되면
// 이전의 종점은 해당 선을 지나는 점들중 하나가 되는셈이다.
c.lineTo(500, 100);
// 이런식으로.
c.strokeStyle = "rgba(255,0,0,255)"
// 색상은 역시 rgb 
c.stroke();
// 이전까지 그어진 선에 stroke를 더하라는 의미? 라고 생각한다.
// 다시말해 괄호열고(beginPath) -> 괄호닫고(stroke) 이런셈?

// 중간 정리 ====
// 정리해보자면 c라는 객체는 2d의 객체들을 다루는 그룹이다.
// 그룹이라는 말은 여러개의 도형들을 같이 다룰 순 있지만
// 각기다른 수식이나 로직을 적용해야한다면 그만큼 객체를 여럿 만들어야할것이다.
// 따라서 복잡한 애니매이션을 만들기위해선 이 c객체만을 사용하긴 힘들것이다.


// 새로운, 독립된 객체를 생성하고자한다면
// beginPath를 무조건 작성해주자. 아니면 이전의 객체의 좌표값과 이번 객체가 이어진다.
// 아마 최상단의 fillRect는 상관없는듯 하다.
// 이유는.. fill 채우기 이니까? 좌표를 가지긴하는데 선으로 구성되지 않아서 그럴수도..
for(var i=0; i < 6; i++){
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    // 랜덤 xy 좌표 생성 구문

    c.beginPath();
    c.arc(x,y,50,0,Math.PI*2, false);
    // x , y , 반지름 ,  
    c.strokeStyle = "rgba("+ 250/i +"," + 40*i + ",0,100)"
    c.stroke();
}
