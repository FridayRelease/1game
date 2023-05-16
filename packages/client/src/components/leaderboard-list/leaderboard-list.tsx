import Position from '../position';
import './leaderboard-list.scss';
import {LeaderboardSelectors} from "@/store/slices/leaderboard-slice";
import {useSelector} from "react-redux";

const LeaderboardList = () => {

    const leaderboardListData = useSelector(LeaderboardSelectors.all);
    console.log('leaderboardListData = ', leaderboardListData)
    const copyArray = [...leaderboardListData.leaderboard];
    const sortedArray = copyArray.sort((a, b) => (Number(b.score) - Number(a.score)));

    const itemList = sortedArray.map((item, index) => {
        const position = index + 1;

        return (
            <li className="leaderboard__row" key={position}>
                <Position className="leaderboard__position" position={position}/>
                <div className="leaderboard__name">{item.name}</div>
                <div className="leaderboard__score">{item.score}</div>
            </li>
        );
    });

    return <ul className="leaderboard__data">{itemList}</ul>;
};

export default LeaderboardList;
