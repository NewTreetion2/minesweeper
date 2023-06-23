export interface customInfo {
  width: number; // 가로
  height: number; // 세로
  bomb: number; // 폭탄의 갯수
}

export interface buttonInfo {
  state: number; // 지뢰, 숫자, 0을 판단해주는 상태
  clicked: boolean; // 클릭이 됐는지 여부
  x: number; // 클릭된 객체의 x 좌표
  y: number; // 클릭된 객체의 y 좌표
}
