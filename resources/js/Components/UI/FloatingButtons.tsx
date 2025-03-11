import { FC } from 'react';
import { BiComment } from 'react-icons/bi';
import { FaVoteYea } from 'react-icons/fa';

interface FloatingButtonsProps {
    onToggleComments: () => void;
    onVote: () => void;
    isVoted: boolean;
}

const FloatingButtons: FC<FloatingButtonsProps> = ({
    onToggleComments,
    onVote,
    isVoted = false,
}) => {
    return (
        <div className="absolute bottom-2 right-2 z-40 grid grid-cols-1 gap-3">
            <button
                className="rounded-sm bg-orange-500 p-2 text-white"
                onClick={onToggleComments}
            >
                <BiComment className="text-lg" />
            </button>
            <button
                onClick={onVote}
                className={`rounded-sm p-2 text-white ${isVoted ? 'bg-orange-500' : 'bg-slate-400'}`}
            >
                <FaVoteYea className="text-lg" />
            </button>
        </div>
    );
};

export default FloatingButtons;
