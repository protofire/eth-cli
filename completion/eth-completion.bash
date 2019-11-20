#!/usr/bin/env bash

# helper method
declare -f _contains_element > /dev/null || _contains_element() {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

_eth_completions()
{
  # get current word, words array, current word index, and previous word, ignoring ":" as a wordbreak
  local cur cword words
  _get_comp_words_by_ref -n ":" cur words cword prev

  # complete subcommands list
  if [ "$cword" -eq "1" ] && [ "abi:add abi:events abi:list abi:methods abi:remove abi:show abi:update address:add address:balance address:list address:random address:remove address:show block:get block:number contract:address contract:call convert event:get event:watch method:decode method:encode method:hash method:search network:add network:list network:remove network:update repl transaction:get transaction:nop" != "" ]; then
    COMPREPLY=($(compgen -W "abi:add abi:events abi:list abi:methods abi:remove abi:show abi:update address:add address:balance address:list address:random address:remove address:show block:get block:number contract:address contract:call convert event:get event:watch method:decode method:encode method:hash method:search network:add network:list network:remove network:update repl transaction:get transaction:nop" -- "$cur"))
    __ltrim_colon_completions "$cur"
    return
  fi

  local subcommand="${words[1]}"

  local args used_flags used_args index

  # register completions for each subcommand
  if [ "${subcommand}" == "abi:add" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "${#used_args[@]}" -eq "1" ]]; then
      COMPREPLY=()
      COMPREPLY=($(compgen -f -- "$cur"))
      return
    fi

    return
  fi
  if [ "${subcommand}" == "abi:events" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      if true; then
        COMPREPLY=($(compgen -W "$(eth abi:list)" -- "$cur"))
      fi
      return
    fi

    return
  fi
  if [ "${subcommand}" == "abi:list" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "abi:methods" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      if true; then
        COMPREPLY=($(compgen -W "$(eth abi:list)" -- "$cur"))
      fi
      return
    fi

    return
  fi
  if [ "${subcommand}" == "abi:remove" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      if true; then
        COMPREPLY=($(compgen -W "$(eth abi:list)" -- "$cur"))
      fi
      return
    fi

    return
  fi
  if [ "${subcommand}" == "abi:show" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      if true; then
        COMPREPLY=($(compgen -W "$(eth abi:list)" -- "$cur"))
      fi
      return
    fi

    return
  fi
  if [ "${subcommand}" == "abi:update" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      if true; then
        COMPREPLY=($(compgen -W "$(eth abi:list)" -- "$cur"))
      fi
      return
    fi
    if [[ "${#used_args[@]}" -eq "1" ]]; then
      COMPREPLY=()
      COMPREPLY=($(compgen -f -- "$cur"))
      return
    fi

    return
  fi
  if [ "${subcommand}" == "address:add" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "address:balance" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ] || [ "${args[0]}" == "-n" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [ "$prev" == "--network" ] || [ "$prev" == "-n" ]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
          if ! _contains_element "-n" "${used_flags[@]}"; then
            completion+=("-n")
          fi
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      if true; then
        COMPREPLY=($(compgen -W "$(eth address:list --json | jq -r 'keys[]')" -- "$cur"))
      fi
      return
    fi

    return
  fi
  if [ "${subcommand}" == "address:list" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "address:random" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--password" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--prefix" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--prefix" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--password" "${used_flags[@]}"; then
          completion+=("--password")
        fi
        if ! _contains_element "--prefix" "${used_flags[@]}"; then
          completion+=("--prefix")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "address:remove" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi

    if [[ "${#used_args[@]}" -eq "0" ]]; then
      COMPREPLY=()
      if command -v eth > /dev/null && command -v jq > /dev/null; then
        COMPREPLY=($(compgen -W "$(eth address:list --json | jq -r 'keys[]')" -- "$cur"))
      fi
      return
    fi

    return
  fi
  if [ "${subcommand}" == "address:show" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "block:get" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "block:number" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "contract:address" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "contract:call" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "convert" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi


      if [ "${args[0]}" == "--from" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--to" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--from" ]]; then
      COMPREPLY=()
      COMPREPLY=($(compgen -W "wei gwei eth" -- "$cur"))
      return
    fi
    if [[ "$prev" == "--to" ]]; then
      COMPREPLY=()
      COMPREPLY=($(compgen -W "wei gwei eth" -- "$cur"))
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--from" "${used_flags[@]}"; then
          completion+=("--from")
        fi
        if ! _contains_element "--to" "${used_flags[@]}"; then
          completion+=("--to")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "event:get" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--json" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--from" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--to" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--from" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--to" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--json" "${used_flags[@]}"; then
          completion+=("--json")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi
        if ! _contains_element "--from" "${used_flags[@]}"; then
          completion+=("--from")
        fi
        if ! _contains_element "--to" "${used_flags[@]}"; then
          completion+=("--to")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "event:watch" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--json" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--json" "${used_flags[@]}"; then
          completion+=("--json")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "method:decode" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "method:encode" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "method:hash" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "method:search" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "network:add" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "network:list" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "network:remove" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "network:update" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi



      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done


    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi


      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "repl" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "transaction:get" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
  if [ "${subcommand}" == "transaction:nop" ]; then
    local args_shift=2
    # get the list of already used flags and args, ignoring the current word
    args=("${words[@]:args_shift}") # args without command and subcommand
    used_flags=()
    used_args=()
    index=0

    while [ "${#args[@]}" -gt 0 ]; do
      if [ "${index}" -eq "$((cword-args_shift))" ]; then
        # ignore current word
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--mainnet" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--rinkeby" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--ropsten" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi
      if [ "${args[0]}" == "--kovan" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:1}")
        index=$((index+1))
        continue
      fi

      if [ "${args[0]}" == "--network" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi
      if [ "${args[0]}" == "--pk" ]; then
        used_flags+=("${args[0]}")
        args=("${args[@]:2}")
        index=$((index+2))
        continue
      fi

      if [[ "${args[0]}" != "-"* ]]; then
        used_args+=("${args[0]}")
      fi
      args=("${args[@]:1}")
      index=$((index+1))
    done

    if [[ "$prev" == "--network" ]]; then
      COMPREPLY=()
      return
    fi
    if [[ "$prev" == "--pk" ]]; then
      COMPREPLY=()
      return
    fi

    if [[ $cur == -* ]]; then
      # flags
      completion=()

      if [[ $cur != --* ]]; then
        true
      fi

        if ! _contains_element "--mainnet" "${used_flags[@]}"; then
          completion+=("--mainnet")
        fi
        if ! _contains_element "--rinkeby" "${used_flags[@]}"; then
          completion+=("--rinkeby")
        fi
        if ! _contains_element "--ropsten" "${used_flags[@]}"; then
          completion+=("--ropsten")
        fi
        if ! _contains_element "--kovan" "${used_flags[@]}"; then
          completion+=("--kovan")
        fi
        if ! _contains_element "--network" "${used_flags[@]}"; then
          completion+=("--network")
        fi
        if ! _contains_element "--pk" "${used_flags[@]}"; then
          completion+=("--pk")
        fi

      COMPREPLY=($(compgen -W "${completion[*]}" -- "$cur"))
      return
    fi


    return
  fi
}

# register completion
complete -F _eth_completions eth

