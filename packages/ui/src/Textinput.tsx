"use client"

export const Textinput = ({
    placeholder,
    onChange,
    label,
    // eslint-disable-next-line no-unused-vars
    value
}: {
    placeholder: string,
    onChange: (value: string) => void;
    label: string;
    value?: string
}) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-slate-700">{label}</label>
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            className="bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 transition-all outline-none shadow-sm hover:border-gray-300"
            placeholder={placeholder}
        />
    </div>
}