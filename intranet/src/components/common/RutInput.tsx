import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { formatRut, validateRut, fetchRutData, type RutData } from '../../services/rutService';

interface RutInputProps {
    value?: string;
    onChange: (value: string) => void;
    onDataFound?: (data: RutData) => void;
    placeholder?: string;
    required?: boolean;
    name?: string;
    className?: string;
}

export default function RutInput({
    value = '',
    onChange,
    onDataFound,
    placeholder = '11.111.111-1',
    required = false,
    name = 'rut',
    className = ''
}: RutInputProps) {
    const [inputValue, setInputValue] = useState(value);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'valid' | 'invalid' | 'error'>('idle');

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const formatted = formatRut(raw);
        setInputValue(formatted);
        onChange(formatted);

        if (raw.length > 2) {
            const isValid = validateRut(formatted);
            setStatus(isValid ? 'valid' : 'invalid');
        } else {
            setStatus('idle');
        }
    };

    const handleSearch = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (status === 'invalid' || inputValue.length < 8) return;

        setIsLoading(true);
        try {
            const data = await fetchRutData(inputValue);
            if (data && onDataFound) {
                onDataFound(data);
                setStatus('valid');
            } else {
                // If no data found, we just keep it as valid format but maybe didn't find details
                setStatus('valid'); // Or 'warning' if you want to indicate not found in DB
            }
        } catch (error: any) {
            console.error(error);
            // Don't mark as 'error' which implies invalid RUT. 
            // Instead, just warn or allow manual entry.
            setStatus('valid'); // Keep it valid so they can ignore the error

            // Optional: You could expose an error state here if you wanted a tooltip
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    name={name}
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    maxLength={12}
                    className={`w-full pl-4 pr-12 py-2 rounded-xl bg-slate-50 border transition-all font-mono
                        ${status === 'invalid' ? 'border-rose-300 focus:ring-rose-200' :
                            status === 'error' ? 'border-amber-300 focus:ring-amber-200' :
                                'border-transparent focus:ring-indigo-100'}
                        focus:outline-none focus:ring-2`}
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={isLoading || status === 'invalid' || inputValue.length < 8}
                    className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors
                        ${status === 'invalid' ? 'text-rose-400 cursor-not-allowed' : 'text-indigo-500 hover:bg-slate-100'}`}
                    title="Buscar datos por RUT"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Search className="w-4 h-4" />
                    )}
                </button>
            </div>
            {status === 'invalid' && inputValue.length > 3 && (
                <span className="text-[10px] text-rose-500 font-medium absolute -bottom-4 left-2">
                    RUT Inválido
                </span>
            )}
        </div>
    );
}
