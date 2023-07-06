<!DOCTYPE html>
<html>
<head>
    <title>날짜별 계획</title>
    <style>
        .plan {
            margin-bottom: 10px;
        }
    </style>
    <script>
        function savePlan() {
            var date = document.getElementById("date").value;
            var plan = document.getElementById("plan").value;

            // 계획을 표시할 요소 생성
            var planElement = document.createElement("div");
            planElement.className = "plan";
            planElement.innerHTML = "<strong>" + date + "</strong>: " + plan;

            // 계획을 추가할 영역에 요소 추가
            var planArea = document.getElementById("plan-area");
            planArea.appendChild(planElement);

            // 로컬 스토리지에 계획 저장
            var plans = localStorage.getItem("plans");
            if (plans) {
                plans = JSON.parse(plans);
            } else {
                plans = [];
            }
            plans.push({ date: date, plan: plan });
            localStorage.setItem("plans", JSON.stringify(plans));
        }

        function loadPlans() {
            var plans = localStorage.getItem("plans");
            if (plans) {
                plans = JSON.parse(plans);
                var planArea = document.getElementById("plan-area");
                planArea.innerHTML = "<h2>계획 목록</h2>";
                plans.forEach(function(planObj) {
                    var planElement = document.createElement("div");
                    planElement.className = "plan";
                    planElement.innerHTML = "<strong>" + planObj.date + "</strong>: " + planObj.plan;
                    planArea.appendChild(planElement);
                });
            }
        }

        function clearPlans() {
            localStorage.removeItem("plans");
            var planArea = document.getElementById("plan-area");
            planArea.innerHTML = "<h2>계획 목록</h2>";
        }
    </script>
</head>
<body onload="loadPlans()">
    <h1>날짜별 계획</h1>

    <form onsubmit="event.preventDefault(); savePlan();">
        <label for="date">날짜:</label>
        <input type="date" id="date"><br><br>

        <label for="plan">계획:</label>
        <input type="text" id="plan" placeholder="계획 입력"><br><br>

        <button type="submit">저장</button>
        <button type="button" onclick="clearPlans()">계획 목록 초기화</button>
    </form>

    <div id="plan-area">
        <h2>계획 목록</h2>
        <!-- 저장된 계획이 여기에 표시됩니다 -->
    </div>
</body>
</html>
