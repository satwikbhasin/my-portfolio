import React, { useCallback } from 'react';
import { Autocomplete, TextField, Chip, Box } from "@mui/material";
import { Filter } from "lucide-react";
import debounce from 'lodash.debounce';
import { TECH_STACK_VALUES } from "@/techStackConfig";
import { useRouter, useSearchParams } from "next/navigation";

interface ProjectsFilterProps {
    searchValue: string[];
    setSearchValue: (value: string[]) => void;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({ searchValue, setSearchValue }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSearchChange = useCallback(debounce((event: React.ChangeEvent<{}>, value: string[]) => {
        setSearchValue(value);
        const params = new URLSearchParams(searchParams ?? '');
        params.delete('techStack');
        value.forEach((tech) => {
            params.append('techStack', tech);
        });
        router.push(`${window.location.pathname}?${params.toString()}`);
    }, 50), [searchParams, router]);

    return (
        <Autocomplete
            multiple
            options={TECH_STACK_VALUES}
            value={searchValue}
            onChange={handleSearchChange}
            noOptionsText={<span style={{ fontSize: "0.8rem", color: '#ffffff' }}>No Matches</span>}
            filterSelectedOptions
            renderOption={(props, option) => {
                const { key, ...otherProps } = props;
                return (
                    <li key={key} {...otherProps}>
                        <Box>
                            <Chip
                                label={option}
                                sx={{
                                    backgroundColor: "transparent",
                                    color: "#ffffff",
                                }}
                            />
                        </Box>
                    </li>
                );
            }}            
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Filter By Technology"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <>
                                <Filter color="#a1a1aa" className="w-5 h-5 me-2" />
                                {params.InputProps.startAdornment}
                            </>
                        ),
                    }}
                    sx={{
                        marginBottom: 4,
                        backgroundColor: 'transparent',
                        '& .MuiOutlinedInput-root': {
                            color: '#a1a1aa',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                    }}
                />
            )}
            sx={{
                '& .MuiAutocomplete-popupIndicator': {
                    display: 'none',
                },
                '& .MuiAutocomplete-clearIndicator': {
                    display: 'none',
                },
                '& .MuiAutocomplete-tag': {
                    backgroundColor: '#27272a',
                    color: '#a1a1aa',
                },
                '& .MuiAutocomplete-option': {
                    padding: '8px 12px',
                    '&[aria-selected="true"]': {
                        backgroundColor: '#33d49a',
                        color: 'white',
                    },
                    '&[data-focus="true"]': {
                        backgroundColor: '#33d49a',
                        color: 'white',
                    },
                },
            }}
            slotProps={{
                popper: {
                    sx: {
                        '& .MuiAutocomplete-paper': {
                            backgroundColor: '#11111265',
                            backdropFilter: 'blur(15px)',
                            color: 'white',
                        },
                    },
                },
            }}
        />
    );
};

export default ProjectsFilter;