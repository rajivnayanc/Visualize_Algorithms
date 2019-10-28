function generateTable(){
    var n_rows = document.getElementById('n_rows').value;
    var n_cols = document.getElementById('n_cols').value;

    if(n_rows>50 || n_cols>50 || n_rows<=0 || n_cols<=0){
        var a = document.getElementById('error_message');

        a.innerHTML = "Rows and Colums should be less than 50 and greater than 0";
    }else{
        var a = document.getElementById('error_message');
        var matrix = document.getElementById('matrix');
        a.innerHTML = "";

        var thead = "<table border = '0'>";

        var tbody = '';

        for(var i = 0; i<n_rows;i++){
            var temp = '<tr>';
            for(var j = 0;j<n_cols;j++){
                temp+="<td><input type='number' style = 'width:40px;'></td>";
            }
            temp+='</tr>';
            tbody+=temp;
        }

        var tfooter = '</table>';
        var btn = "<br><br><button onclick='solve()'>Solve</button>";
        var err = "<br><span id='error_msg' style='color: red'></span>";

        matrix.innerHTML = thead+tbody+tfooter+btn+err;    
    }
    
}

function solve() {

    var n_rows = parseInt(document.getElementById('n_rows').value,10);
    var n_cols = parseInt(document.getElementById('n_cols').value,10);

    var a = document.getElementById('error_msg');
    var matrix_e = document.getElementById('matrix');
    var matrix_element = matrix_e.children[0].children[0];

    var matrix = [];
    var dp = [];
    var path = [];

    var bools = [];
    for(var i = 0;i<matrix_element.children.length;i++){
        var temp_row = [];
        var p = [];
        var p2 = [];
        var p3 = [];
        var m_row = matrix_element.children[i];
        for(var j  = 0;j<m_row.children.length;j++){
            var inp = parseFloat(m_row.children[j].children[0].value,10);
            temp_row.push(inp);
            p.push(100000000);
            p2.push([]);
            p3.push(0);
        }
        matrix.push(temp_row);
        dp.push(p);
        path.push(p2);
        bools.push(p3);
    }


    var q = new Queue;

    q.enqueue([0,0]);

    dp[0][0] = matrix[0][0];
    path[0][0] = [0,0];
    var dx = [0,0,1,-1];
    var dy = [1,-1,0,0];

    while(!q.isEmpty()){
        var a = q.peek();
        q.dequeue();

        for(var i = 0;i<4;i++){
            var x = a[0] + dx[i];
            var y = a[1] + dy[i];

            if(x>=0 && x<n_rows && y>=0 && y<n_cols){
                var res = dp[a[0]][a[1]] + matrix[x][y];

                if(res<dp[x][y]){
                    dp[x][y]=res;
                    path[x][y]=[a[0],a[1]];
                    q.enqueue([x,y]);
                }
            }
        }
    }


    var current = [n_rows-1,n_cols-1];
    while(current[0]!=0 || current[1]!=0){
        bools[current[0]][current[1]]=1;
        current = path[current[0]][current[1]];
    }
    bools[0][0]=1;

    var thead = "<table border = '1'>";

    var tbody = '';

    for (var i = 0; i < n_rows; i++) {
        var temp = '<tr>';
        for (var j = 0; j < n_cols; j++) {
            if(bools[i][j]==1) 
                temp += "<td style = 'width:40px;color:white; background-color:red'>"+ matrix[i][j] +"</td>";
            else
                temp += "<td style = 'width:40px;'>" + matrix[i][j] + "</td>";
        }
        temp += '</tr>';
        tbody += temp;
    }

    var tfooter = '</table>';
    var ress = "<br><span style='color: red'>Minimum Cost:" + dp[n_rows - 1][n_cols - 1]  +"</span>";

    matrix_e.innerHTML = thead + tbody + tfooter + ress;

}