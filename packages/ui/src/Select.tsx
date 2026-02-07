"use client"
export const Select = ({ options, onSelect }: {
    onSelect: (_value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return <select onChange={(e) => {
        onSelect(e.target.value)
    }} className="bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 transition-all outline-none shadow-sm">
        {options.map(option => <option key={option.key} value={option.key}>{option.value}</option>)}
    </select>
}