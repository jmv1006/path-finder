import IGrid from "../config/interfaces/IGrid";
import ISpace from "../config/interfaces/ISpace";

const bfs = (grid: IGrid) => {
    const start = grid.start;
    const end = grid.end;
    const blocked = getBlocked(grid.rows);

    const visit = new Set();
    const queue = [];

    queue.push([start, [start]]);
    visit.add(start[0].toString().concat(start[1].toString()))

    while(queue.length > 0) {
        for(let i = 0; i < queue.length; i++) {
            const node: any= queue.shift();
            
            const position = node[0]
            const path = node[1]

            if (position[0] == end[0] && position[1] == end[1]) {
                console.log(path)
                return path.length - 1
            } 

            const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]]

            for(let j = 0; j < neighbors.length; j++) {
                const neighbor = neighbors[j];

                const dr = position[0] + neighbor[0];
                const dc = position[1] + neighbor[1];

                if ((dr >= grid.rows.length || dr < 0) || (dc >= grid.rows[0].length || dc < 0) || (visit.has(dr.toString().concat(dc.toString()))) || (blocked.includes(dr.toString().concat(dc.toString())))) {
                    continue
                } else {
                    queue.push([[dr, dc], path.concat([[dr, dc]])])
                    visit.add(dr.toString().concat(dc.toString()))
                }
            }
        }
    }

    return -1
}

const getBlocked = (rows: Array<Array<ISpace>>) => {
    const blocked = [];

    for(let r = 0; r < rows.length; r++) {
        for(let c = 0; c < rows[0].length; c++) {
            const space: ISpace = rows[r][c];
            if(space.blocked) blocked.push(r.toString().concat(c.toString()))
        }
    }

    return blocked
}

export default bfs