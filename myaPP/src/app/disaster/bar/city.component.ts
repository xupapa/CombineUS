import { Component } from '@angular/core';
import * as G2 from '@antv/g2';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];


@Component({
  selector: 'app-disaster-city',
  templateUrl: './city.component.html',
//   styleUrls: ['./app.component.css']
})
export class CityComponent implements OnInit {

  title = 'app';
  ngOnInit(): void {
      const chart = new G2.Chart({
      container: 'c1',
      width: 600,
      height: 300
    });
    // Step 2: 载入数据源
chart.source(data);
// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
chart.interval().position('genre*sold').color('genre');
// Step 4: 渲染图表
chart.render();
  }
}
